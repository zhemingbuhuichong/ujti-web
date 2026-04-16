import { QUESTIONS } from './data/questions.js';
import { computeResult } from './logic/scoring.js';
import { renderQuestionCard, renderResultPanel } from './render/templates.js';

const state = {
  answers: {}
};

const screenIntro = document.getElementById('screen-intro');
const screenTest = document.getElementById('screen-test');
const screenResult = document.getElementById('screen-result');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const submitButton = document.getElementById('submit-button');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const questionList = document.getElementById('question-list');
const resultMount = document.getElementById('result-mount');

function showScreen(name) {
  screenIntro.hidden = name !== 'intro';
  screenTest.hidden = name !== 'test';
  screenResult.hidden = name !== 'result';
}

function countAnswered() {
  return QUESTIONS.reduce((count, question) => (
    Object.hasOwn(state.answers, question.id) ? count + 1 : count
  ), 0);
}

function updateProgress() {
  const answered = countAnswered();
  const total = QUESTIONS.length;
  const percent = total ? (answered / total) * 100 : 0;

  progressText.textContent = `${answered} / ${total}`;
  progressBar.style.width = `${percent}%`;
  submitButton.disabled = answered !== total;
}

function renderQuestions() {
  questionList.innerHTML = QUESTIONS
    .map((question, index) => renderQuestionCard(question, index + 1, state.answers[question.id]))
    .join('');

  updateProgress();
}

function syncSelectedState(target) {
  const questionCard = target.closest('.question-card');
  if (!questionCard) {
    return;
  }

  for (const optionRow of questionCard.querySelectorAll('.option-row')) {
    optionRow.classList.toggle('is-selected', optionRow.contains(target));
  }
}

function startTest() {
  state.answers = {};
  resultMount.innerHTML = '';
  renderQuestions();
  showScreen('test');
}

function restartTest() {
  state.answers = {};
  resultMount.innerHTML = '';
  showScreen('intro');
  progressText.textContent = `0 / ${QUESTIONS.length}`;
  progressBar.style.width = '0%';
  submitButton.disabled = true;
}

function finishTest() {
  const result = computeResult(state.answers);
  resultMount.innerHTML = renderResultPanel(result);
  showScreen('result');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

questionList.addEventListener('change', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== 'radio') {
    return;
  }

  state.answers[target.name] = Number(target.value);
  syncSelectedState(target);
  updateProgress();
});

startButton.addEventListener('click', startTest);
restartButton.addEventListener('click', restartTest);
submitButton.addEventListener('click', finishTest);

showScreen('intro');
updateProgress();
