import test from 'node:test';
import assert from 'node:assert/strict';

import { QUESTIONS } from '../../src/data/questions.js';
import { computeResult } from '../../src/logic/scoring.js';

function answersForPattern(targetLevels, overrides = {}) {
  const levelToValue = { L: 1, M: 2, H: 3 };
  return Object.fromEntries(
    QUESTIONS.map((question) => [question.id, overrides[question.id] ?? levelToValue[targetLevels[question.dimension]]])
  );
}

test('normal scoring returns a direct school match and two nearby schools', () => {
  const result = computeResult(answersForPattern({
    engineering: 'H',
    order: 'L',
    fuel: 'L',
    field: 'L'
  }));

  assert.equal(result.finalResult.code, 'INTELL-COMP');
  assert.deepEqual(result.nearResults.map((item) => item.code), ['MICRO', 'MATERIAL']);
  assert.deepEqual(result.rankedPublicResults.slice(0, 3).map((item) => item.code), [
    'INTELL-COMP',
    'MICRO',
    'MATERIAL'
  ]);
  assert.equal(result.nearResults.length, 2);
  assert.equal(result.levels.engineering, 'H');
});

test('academic affairs probe can overwrite the public result', () => {
  const answers = answersForPattern(
    { engineering: 'L', order: 'H', fuel: 'L', field: 'H' },
    {
      'order-02': 2,
      'order-03': 3,
      'order-04': 3,
      'order-05': 2,
      'order-06': 3,
      'order-07': 2,
      'order-08': 2,
      'field-01': 1,
      'field-02': 1,
      'field-03': 2,
      'field-04': 3,
      'field-05': 3,
      'field-06': 3,
      'field-07': 3,
      'field-08': 3
    }
  );
  const result = computeResult(answers);

  assert.equal(result.finalResult.code, 'ACADEMIC-AFFAIRS');
  assert.equal(result.nearResults.length, 0);
  assert.equal(result.probeScores.academicAffairs, 6);
  assert.ok(result.probeScores.laoJin < 6);
});

test('academic affairs wins when both hidden predicates are true', () => {
  const result = computeResult(answersForPattern({
    engineering: 'H',
    order: 'H',
    fuel: 'H',
    field: 'H'
  }));

  assert.equal(result.finalResult.code, 'ACADEMIC-AFFAIRS');
  assert.equal(result.nearResults.length, 0);
  assert.ok(result.probeScores.academicAffairs >= 6);
  assert.ok(result.probeScores.laoJin >= 6);
});

test('academic affairs probe score 5 does not trigger a hidden result', () => {
  const result = computeResult(answersForPattern(
    { engineering: 'L', order: 'H', fuel: 'L', field: 'H' },
    {
      'order-02': 2,
      'order-03': 2,
      'order-04': 3,
      'order-05': 2,
      'order-06': 3,
      'order-07': 2,
      'order-08': 2
    }
  ));

  assert.equal(result.probeScores.academicAffairs, 5);
  assert.notEqual(result.finalResult.code, 'ACADEMIC-AFFAIRS');
  assert.equal(result.nearResults.length, 2);
});

test('lao jin can overwrite the energy school result', () => {
  const result = computeResult(answersForPattern({
    engineering: 'H',
    order: 'M',
    fuel: 'H',
    field: 'M'
  }));

  assert.equal(result.finalResult.code, 'LAO-JIN');
  assert.equal(result.nearResults.length, 0);
  assert.equal(result.rankedPublicResults[0].code, 'ENERGY');
  assert.ok(result.probeScores.laoJin >= 6);
});

test('lao jin probe score 5 does not trigger the hidden result', () => {
  const result = computeResult(answersForPattern(
    { engineering: 'H', order: 'M', fuel: 'H', field: 'M' },
    {
      'order-01': 1,
      'fuel-01': 3,
      'fuel-02': 3,
      'fuel-03': 2,
      'fuel-04': 3,
      'fuel-05': 2,
      'fuel-06': 2,
      'fuel-07': 2,
      'fuel-08': 2
    }
  ));

  assert.equal(result.probeScores.laoJin, 5);
  assert.equal(result.finalResult.code, 'ENERGY');
  assert.equal(result.nearResults.length, 2);
});

test('lao jin does not trigger when the top school is not energy', () => {
  const result = computeResult(answersForPattern({
    engineering: 'H',
    order: 'M',
    fuel: 'H',
    field: 'H'
  }));

  assert.notEqual(result.finalResult.code, 'LAO-JIN');
  assert.notEqual(result.rankedPublicResults[0].code, 'ENERGY');
});

test('public ranking stays deterministic on ties', () => {
  const result = computeResult(answersForPattern({
    engineering: 'L',
    order: 'L',
    fuel: 'L',
    field: 'L'
  }));

  assert.deepEqual(result.rankedPublicResults.slice(0, 3).map((item) => item.code), [
    'MATH',
    'EARTH',
    'SCIENCE'
  ]);
});

test('unknown probe keys throw instead of corrupting scores', () => {
  const question = QUESTIONS.find((item) => item.id === 'order-03');
  const option = question.options.find((item) => item.value === 3);
  const originalProbes = option.probes;
  option.probes = { ...originalProbes, unexpectedProbe: 1 };

  try {
    assert.throws(
      () => computeResult(answersForPattern({
        engineering: 'L',
        order: 'H',
        fuel: 'L',
        field: 'L'
      })),
      /Unexpected probe key "unexpectedProbe" on question "order-03" option 3/
    );
  } finally {
    option.probes = originalProbes;
  }
});
