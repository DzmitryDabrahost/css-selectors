/* eslint-disable no-param-reassign */
import './css/style.css';
import 'highlight.js/styles/darcula.css';

import createData from './js/Data/data';
import createDom from './js/createDom';
import hoverHundler from './js/hoverHandler';
import createWindow from './js/finishWindow';

let levelCount;

// First start: create localStorage flags
if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en');
}

if (!localStorage.getItem('level')) {
  levelCount = 0;
  localStorage.setItem('level', levelCount);
  createData(); // create array (first default data)
} else {
  levelCount = +localStorage.getItem('level');
}

const userList = JSON.parse(localStorage.getItem('userList'));
const lang = localStorage.getItem('lang') === 'en' ? 0 : 1;
const helpButton = document.querySelector('.top-hint-link');
const bottomContent = document.querySelector('.main-bottom');
const input = document.querySelector('.form-input');
const menu = document.querySelector('.toggle-menu');
const burgerMenu = document.querySelector('.level-menu');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const choiceLanguage = document.querySelector('.header-languages');
const visualBlock = document.querySelector('.top-visual');
const menuList = document.querySelector('.menu-list');
const resetButton = document.querySelector('.reset-button');
const hideMenuToAdaptive = document.querySelector('.right-col-arrow-content');

function checkToCount() {
  levelCount = +localStorage.getItem('level');
  next.classList.remove('no-active');
  prev.classList.remove('no-active');
  if (levelCount === userList[0].length - 1) next.classList.add('no-active');
  if (levelCount === 0) prev.classList.add('no-active');
}

function checkToComplete() {
  levelCount = localStorage.getItem('level');
  const check = document.querySelector('.main-right-check');
  const checkHint = document.querySelector('.main-right-check-hint');
  checkHint.classList.remove('hint');
  check.classList.remove('complete');
  if (userList[lang][levelCount].correct) check.classList.add('complete');
  if (userList[lang][levelCount].hint) checkHint.classList.add('hint');
}

function checkToLanguage() {
  const language = localStorage.getItem('lang');
  switch (language) {
    case 'en':
      helpButton.textContent = 'Help, I\'m stuck!';
      break;
    case 'ru':
      helpButton.textContent = 'Нужна помощь, туплю!';
      break;
    default:
  }
}

prev.addEventListener('click', () => {
  destroy();
  setTimeout(() => {
    levelCount--;
    localStorage.setItem('level', levelCount);
    checkToCount();
    createDom();
    addBackgroundMenuItem();
  }, 800);
});

next.addEventListener('click', nextLevel);

function destroy() {
  document.body.classList.add('animate-page');
}

function nextLevel() {
  destroy();
  setTimeout(() => {
    visualBlock.style.width = '';
    levelCount = localStorage.getItem('level');
    levelCount++;
    localStorage.setItem('level', levelCount);
    checkToCount();
    createDom();
    addBackgroundMenuItem();
    createWindow();
  }, 800);
}

menuList.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target === menuList) return;
  changeLevel(e.target.dataset.number);
});

function changeLevel(count) {
  localStorage.setItem('level', count);
  menu.classList.remove('toggle-left');
  destroy();
  setTimeout(() => {
    createDom();
    checkToCount();
    addBackgroundMenuItem();
  }, 800);
}

choiceLanguage.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.dataset.country === 'england') {
    localStorage.setItem('lang', 'en');
    checkToLanguage();
    checkToCount();
    createDom();
    addBackgroundMenuItem();
  } else {
    localStorage.setItem('lang', 'ru');
    checkToLanguage();
    createDom();
    addBackgroundMenuItem();
  }
});

createDom();
hoverHundler();
checkToLanguage();
checkToCount();

function addBackgroundMenuItem() {
  const all = [...document.querySelectorAll('.right-main-link')];
  all.forEach((item) => {
    item.classList.remove('choice-fon');
    if (item.dataset.number === localStorage.getItem('level')) {
      item.classList.add('choice-fon');
    }
  });
  checkToComplete();
}

addBackgroundMenuItem();

burgerMenu.addEventListener('click', () => {
  menu.classList.toggle('toggle-left');
});

helpButton.addEventListener('click', () => {
  levelCount = localStorage.getItem('level');
  userList[0][levelCount].hint = true;
  userList[1][levelCount].hint = true;
  localStorage.setItem('userList', JSON.stringify(userList));
  const result = userList[lang][levelCount].answer.split('');
  for (let i = 0; i < result.length; i++) {
    setTimeout(() => {
      changeInputValue();
      input.value += result[i];
    }, i * 300);
  }
});

function changeInputValue() {
  if (!input.value.trim()) {
    input.classList.add('empty-input');
  } else {
    input.classList.remove('empty-input');
  }
}

input.addEventListener('keypress', changeInputValue);

function addCompleteCheck() {
  levelCount = localStorage.getItem('level');
  userList[0][levelCount].correct = true;
  userList[1][levelCount].correct = true;
  localStorage.setItem('userList', JSON.stringify(userList));
}

document.addEventListener('submit', () => {
  if (input.value === userList[lang][localStorage.getItem('level')].answer) {
    const visualBlockWeight = document.querySelector('.top-visual').offsetWidth;
    visualBlock.style.width = `${visualBlockWeight}px`;
    [...document.querySelectorAll('.strobe')].forEach((item) => item.classList.add('win'));
    input.value = '';
    addCompleteCheck();
    setTimeout(nextLevel, 500);
  } else if (typeof Number(input.value) === 'number' && input.value > 0 && input.value <= 20) {
    changeLevel(Number(input.value) - 1);
    input.value = '';
  } else {
    input.value = '';
    bottomContent.classList.add('strobe');
    setTimeout(() => {
      bottomContent.classList.remove('strobe');
    }, 500);
  }
});

resetButton.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.reload();
});

hideMenuToAdaptive.addEventListener('click', () => {
  const rightCol = document.querySelector('.right-col');
  hideMenuToAdaptive.classList.toggle('rotate180');
  rightCol.classList.toggle('toggle-right');
});
