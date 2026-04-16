import { DIMENSION_ORDER, scoreToLevel } from '../data/dimensions.js';
import { QUESTIONS } from '../data/questions.js';
import { PUBLIC_RESULTS, RESULT_BY_CODE } from '../data/results.js';

function levelValue(level) {
  return { L: 1, M: 2, H: 3 }[level];
}

function scoreQuestions(answers) {
  const rawScores = Object.fromEntries(DIMENSION_ORDER.map((key) => [key, 0]));
  const probeScores = { academicAffairs: 0, laoJin: 0 };
  const validProbeKeys = new Set(Object.keys(probeScores));

  for (const question of QUESTIONS) {
    const value = Number(answers[question.id] || 0);
    rawScores[question.dimension] += value;

    const chosen = question.options.find((option) => option.value === value);
    if (!chosen || !chosen.probes) continue;

    for (const [probeKey, probeValue] of Object.entries(chosen.probes)) {
      if (!validProbeKeys.has(probeKey)) {
        throw new Error(
          `Unexpected probe key "${probeKey}" on question "${question.id}" option ${chosen.value}`
        );
      }

      probeScores[probeKey] += probeValue;
    }
  }

  const levels = Object.fromEntries(
    DIMENSION_ORDER.map((key) => [key, scoreToLevel(rawScores[key])])
  );

  return { rawScores, probeScores, levels };
}

function rankPublicResults(levels) {
  const userVector = DIMENSION_ORDER.map((key) => levelValue(levels[key]));

  return PUBLIC_RESULTS
    .map((result) => {
      const resultVector = result.vector.split('').map(levelValue);
      const distance = resultVector.reduce(
        (sum, item, index) => sum + Math.abs(item - userVector[index]),
        0
      );

      return { ...result, distance };
    })
    .sort((a, b) => a.distance - b.distance || a.label.localeCompare(b.label, 'zh-CN'));
}

function stripDistance(result) {
  const { distance, ...publicResult } = result;
  return publicResult;
}

function pickHiddenResult(levels, probeScores, rankedPublicResults) {
  const orderHigh = levels.order === 'H';
  const fieldHigh = levels.field === 'H';
  const topPublicResult = rankedPublicResults[0];

  if (orderHigh && fieldHigh && probeScores.academicAffairs >= 6) {
    return RESULT_BY_CODE['ACADEMIC-AFFAIRS'];
  }

  if (topPublicResult?.code === 'ENERGY' && probeScores.laoJin >= 6) {
    return RESULT_BY_CODE['LAO-JIN'];
  }

  return null;
}

export function computeResult(answers) {
  const { rawScores, probeScores, levels } = scoreQuestions(answers);
  const rankedPublicResults = rankPublicResults(levels);
  const publicRankedResults = rankedPublicResults.map(stripDistance);
  const hiddenResult = pickHiddenResult(levels, probeScores, publicRankedResults);

  if (hiddenResult) {
    return {
      rawScores,
      probeScores,
      levels,
      finalResult: hiddenResult,
      nearResults: [],
      rankedPublicResults: publicRankedResults
    };
  }

  return {
    rawScores,
    probeScores,
    levels,
    finalResult: publicRankedResults[0],
    nearResults: publicRankedResults.slice(1, 3),
    rankedPublicResults: publicRankedResults
  };
}
