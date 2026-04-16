import test from 'node:test';
import assert from 'node:assert/strict';

import {
  HIDDEN_RESULTS,
  PUBLIC_RESULTS,
  RESULT_BY_CODE
} from '../../src/data/results.js';

const EXPECTED_PUBLIC_LABELS = [
  '机械工程学院',
  '精密仪器与光电子工程学院',
  '电气自动化与信息工程学院',
  '微电子学院',
  '智能与计算学部',
  '建筑工程学院',
  '化工学院',
  '合成生物与生物制造学院',
  '材料科学与工程学院',
  '管理与经济学部',
  '人文艺术学院',
  '外国语学院',
  '法学院',
  '马克思主义学院',
  '理学院',
  '数学学院',
  '医学部',
  '海洋科学与技术学院',
  '地球系统科学学院',
  '能源学院',
  '未来技术科学学院',
  '教育学院'
];

test('result catalog matches the current school-based contract', () => {
  assert.equal(PUBLIC_RESULTS.length, 22);
  assert.equal(HIDDEN_RESULTS.length, 2);
  assert.deepEqual(PUBLIC_RESULTS.map((item) => item.label), EXPECTED_PUBLIC_LABELS);
  assert.deepEqual(HIDDEN_RESULTS.map((item) => item.code), ['ACADEMIC-AFFAIRS', 'LAO-JIN']);
  assert.equal(RESULT_BY_CODE['ACADEMIC-AFFAIRS'].label, '教务老师');
  assert.equal(RESULT_BY_CODE['ACADEMIC-AFFAIRS'].kicker, '同学你好');
  assert.equal(RESULT_BY_CODE['ACADEMIC-AFFAIRS'].summary, '请看校历');
  assert.equal(RESULT_BY_CODE['LAO-JIN'].label, '牢金');
  assert.equal(RESULT_BY_CODE['ENERGY'].label, '能源学院');
  assert.equal(RESULT_BY_CODE['LAO-JIN'].kicker, '今年冬天很寒冷');
  assert.equal(RESULT_BY_CODE['LAO-JIN'].summary, '永远怀念');
});

test('result codes are unique and RESULT_BY_CODE covers the whole catalog', () => {
  const combined = [...PUBLIC_RESULTS, ...HIDDEN_RESULTS];
  const codes = combined.map((result) => result.code);
  assert.equal(new Set(codes).size, combined.length);
  assert.equal(Object.keys(RESULT_BY_CODE).length, combined.length);
  for (const result of combined) {
    assert.strictEqual(RESULT_BY_CODE[result.code], result);
  }
});

test('every result exposes the expected string fields and vector contract', () => {
  for (const result of PUBLIC_RESULTS) {
    assert.match(result.vector, /^[LMH]{4}$/);
    assert.equal(typeof result.code, 'string');
    assert.equal(typeof result.label, 'string');
    assert.equal(typeof result.officialAnchor, 'string');
    assert.equal(typeof result.kicker, 'string');
    assert.equal(typeof result.summary, 'string');
  }

  for (const result of HIDDEN_RESULTS) {
    assert.match(result.vector, /^X[LMH]{3}$/);
    assert.equal(typeof result.code, 'string');
    assert.equal(typeof result.label, 'string');
    assert.equal(typeof result.officialAnchor, 'string');
    assert.equal(typeof result.kicker, 'string');
    assert.equal(typeof result.summary, 'string');
  }
});
