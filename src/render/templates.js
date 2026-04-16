import { DIMENSION_ORDER, DIMENSIONS } from '../data/dimensions.js';

const OPTION_LABELS = ['A', 'B', 'C'];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderDimensionLevel(key, level) {
  const dimension = DIMENSIONS[key];

  return `
    <li class="dimension-item">
      <div class="dimension-item__head">
        <span class="dimension-name">${escapeHtml(dimension.label)}</span>
        <span class="dimension-level">${escapeHtml(level)}</span>
      </div>
      <p class="dimension-copy">
        ${escapeHtml(dimension.lowLabel)} / ${escapeHtml(dimension.highLabel)}
      </p>
      <p class="dimension-description">${escapeHtml(dimension.description)}</p>
    </li>
  `;
}

export function renderQuestionCard(question, index, selectedValue) {
  return `
    <article class="question-card" data-question-id="${escapeHtml(question.id)}">
      <div class="question-card__meta">
        <span class="badge">第 ${index} 题</span>
      </div>
      <h3 class="question-card__title">${escapeHtml(question.text)}</h3>
      <div class="question-card__options" role="radiogroup" aria-label="${escapeHtml(question.text)}">
        ${question.options.slice(0, 3).map((option, optionIndex) => `
          <label class="option-row${selectedValue === option.value ? ' is-selected' : ''}">
            <input
              type="radio"
              name="${escapeHtml(question.id)}"
              value="${escapeHtml(option.value)}"
              ${selectedValue === option.value ? 'checked' : ''}
            >
            <span class="option-code">${OPTION_LABELS[optionIndex]}</span>
            <span class="option-text">${escapeHtml(option.label)}</span>
          </label>
        `).join('')}
      </div>
    </article>
  `;
}

export function renderResultPanel({ finalResult, nearResults, levels }) {
  const dimensionMarkup = DIMENSION_ORDER.map((key) => renderDimensionLevel(key, levels[key])).join('');
  const nearResultMarkup = nearResults.length
    ? `
      <section class="result-section" aria-labelledby="near-results-title">
        <h3 id="near-results-title" class="result-section__title">你也可能更适合</h3>
        <ul class="near-result-list">
          ${nearResults.map((item) => `
            <li class="near-result-item">
              <strong>${escapeHtml(item.label)}</strong>
              <span>${escapeHtml(item.officialAnchor)}</span>
            </li>
          `).join('')}
        </ul>
      </section>
    `
    : '';

  return `
    <header class="result-hero">
      <p class="eyebrow">匹配结果</p>
      <h2 class="result-title">${escapeHtml(finalResult.label)}</h2>
      <p class="result-anchor">推荐去向：${escapeHtml(finalResult.officialAnchor)}</p>
      <p class="result-kicker">${escapeHtml(finalResult.kicker)}</p>
      <p class="result-summary">${escapeHtml(finalResult.summary)}</p>
    </header>
    <section class="result-section" aria-labelledby="dimension-title">
      <h3 id="dimension-title" class="result-section__title">维度说明</h3>
      <ul class="dimension-list">
        ${dimensionMarkup}
      </ul>
    </section>
    ${nearResultMarkup}
  `;
}
