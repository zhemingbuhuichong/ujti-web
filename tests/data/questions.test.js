import test from 'node:test';
import assert from 'node:assert/strict';

import { QUESTIONS } from '../../src/data/questions.js';

const VALID_DIMENSIONS = new Set(['engineering', 'order', 'fuel', 'field']);
const ALLOWED_PROBE_KEYS = new Set(['academicAffairs', 'laoJin']);

test('question bank contains 32 scored questions', () => {
  assert.equal(QUESTIONS.length, 32);
});

test('question bank is published in a fixed shuffled order', () => {
  assert.deepEqual(
    QUESTIONS.map((question) => question.id),
    [
      'order-01',
      'eng-03',
      'field-02',
      'fuel-04',
      'eng-01',
      'order-05',
      'fuel-02',
      'field-07',
      'fuel-05',
      'field-01',
      'order-03',
      'eng-06',
      'field-06',
      'fuel-01',
      'eng-08',
      'order-08',
      'eng-02',
      'field-04',
      'order-06',
      'fuel-07',
      'field-03',
      'eng-04',
      'fuel-03',
      'order-02',
      'eng-07',
      'order-07',
      'field-05',
      'fuel-08',
      'eng-05',
      'fuel-06',
      'field-08',
      'order-04'
    ]
  );
});

test('question ids, dimensions, text, and options follow the catalog contract', () => {
  const ids = new Set();

  for (const question of QUESTIONS) {
    assert.equal(typeof question.id, 'string');
    assert.ok(!ids.has(question.id));
    ids.add(question.id);

    assert.ok(VALID_DIMENSIONS.has(question.dimension));
    assert.equal(typeof question.text, 'string');
    assert.ok(question.text.trim().length > 0);

    assert.equal(question.options.length, 3);

    const values = new Set();
    for (const option of question.options) {
      assert.equal(typeof option.label, 'string');
      assert.ok(option.label.trim().length > 0);
      assert.equal(typeof option.value, 'number');
      values.add(option.value);

      if (option.probes) {
        for (const [key, weight] of Object.entries(option.probes)) {
          assert.ok(ALLOWED_PROBE_KEYS.has(key));
          assert.equal(typeof weight, 'number');
          assert.ok(Number.isFinite(weight));
        }
      }
    }

    assert.deepEqual(values, new Set([1, 2, 3]));
  }
});

test('each dimension contributes exactly 8 questions', () => {
  const counts = QUESTIONS.reduce((acc, item) => {
    acc[item.dimension] = (acc[item.dimension] || 0) + 1;
    return acc;
  }, {});

  assert.deepEqual(counts, {
    engineering: 8,
    order: 8,
    fuel: 8,
    field: 8
  });
});

test('question bank includes probes for both hidden results', () => {
  const allProbeKeys = new Set(
    QUESTIONS.flatMap((question) =>
      question.options.flatMap((option) => Object.keys(option.probes || {}))
    )
  );

  assert.ok(allProbeKeys.has('academicAffairs'));
  assert.ok(allProbeKeys.has('laoJin'));
});

test('hidden probe families appear more than once and carry positive weight', () => {
  const probeStats = {
    academicAffairs: { occurrences: 0, totalWeight: 0 },
    laoJin: { occurrences: 0, totalWeight: 0 }
  };

  for (const question of QUESTIONS) {
    for (const option of question.options) {
      for (const [key, weight] of Object.entries(option.probes || {})) {
        probeStats[key].occurrences += 1;
        probeStats[key].totalWeight += weight;
      }
    }
  }

  assert.ok(probeStats.academicAffairs.occurrences >= 2);
  assert.ok(probeStats.laoJin.occurrences >= 2);
  assert.ok(probeStats.academicAffairs.totalWeight > 0);
  assert.ok(probeStats.laoJin.totalWeight > 0);
});

test('published question options use a fixed shuffled order instead of keeping every item as 1-2-3', () => {
  const defaultOrderCount = QUESTIONS.filter(
    (question) => question.options.map((option) => option.value).join(',') === '1,2,3'
  ).length;

  assert.equal(defaultOrderCount, 0);
});

test('current published copy keeps the revised vacation and group-work prompts', () => {
  const vacationQuestion = QUESTIONS.find((question) => question.id === 'order-01');
  const groupWorkQuestion = QUESTIONS.find((question) => question.id === 'order-03');

  assert.equal(vacationQuestion?.text, '群里有人问“五一到底放哪几天”，你最像哪种人？');
  assert.deepEqual(
    vacationQuestion?.options.map((option) => option.label),
    [
      '直接把校历或通知甩过去：请以官方安排为准。',
      '先猜一个，大差不差就行。',
      '先等等，看看有没有人已经问到准信了。'
    ]
  );

  assert.equal(
    groupWorkQuestion?.text,
    '小组作业刚开工，有人提议“先把能做的部分做起来，细节后面再补”，你会：'
  );
  assert.deepEqual(
    groupWorkQuestion?.options.map((option) => option.label),
    [
      '不行，流程乱了后面会更乱。',
      '可以，先把东西做出来再说。',
      '行，但别偏太多就行。'
    ]
  );
});
