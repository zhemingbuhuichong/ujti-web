import test from 'node:test';
import assert from 'node:assert/strict';

import { renderQuestionCard, renderResultPanel } from '../../src/render/templates.js';

test('renderQuestionCard renders title, badge, and three labeled options without exposing the dimension', () => {
  const markup = renderQuestionCard(
    {
      id: 'demo',
      text: '食堂突然推出神秘新菜，你会怎么做？',
      dimension: 'order',
      options: [
        { value: 1, label: '先试再说。' },
        { value: 2, label: '先看看评价。' },
        { value: 3, label: '先确认原料和通知。' }
      ]
    },
    1,
    2
  );

  assert.match(markup, /第 1 题/);
  assert.doesNotMatch(markup, /做事维度/);
  assert.match(markup, /A/);
  assert.match(markup, /B/);
  assert.match(markup, /C/);
  assert.match(markup, /先看看评价。/);
  assert.match(markup, /checked/);
});

test('renderResultPanel renders the final anchor, summary, dimensions, and near results', () => {
  const markup = renderResultPanel({
    finalResult: {
      label: '智能与计算学部',
      officialAnchor: '智能与计算学部',
      kicker: '先把逻辑盘明白。',
      summary: '你更适合和代码、算法、系统结构打交道。'
    },
    nearResults: [
      { label: '微电子学院', officialAnchor: '微电子学院' },
      { label: '材料科学与工程学院', officialAnchor: '材料科学与工程学院' }
    ],
    levels: {
      engineering: 'H',
      order: 'L',
      fuel: 'M',
      field: 'H'
    }
  });

  assert.match(markup, /智能与计算学部/);
  assert.match(markup, /推荐去向/);
  assert.match(markup, /维度说明/);
  assert.match(markup, /你也可能更适合/);
  assert.match(markup, /微电子学院/);
  assert.match(markup, /材料科学与工程学院/);
});
