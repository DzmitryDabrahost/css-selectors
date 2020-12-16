import hljs from 'highlight.js';

function createDom() {
  if (document.body.classList.contains('animate-page')) document.body.classList.remove('animate-page');
  let index = localStorage.getItem('level');
  const userList = JSON.parse(localStorage.getItem('userList'));
  const lang = localStorage.getItem('lang') === 'en' ? 0 : 1;

  const topTitle = document.querySelector('.top-title');
  const rightTitle = document.querySelector('.description-title-main');
  const rightSubtitle = document.querySelector('.description-subtitle');
  const selectorName = document.querySelector('.selector-type');
  const conditionTask = document.querySelector('.task-condition');
  const examplesOne = document.querySelector('.examples-content');
  const gameVisual = document.querySelector('.top-visual');
  const levelCount = document.querySelector('.level-count');
  const menuList = document.querySelector('.menu-list');
  const gameField = document.querySelector('.game-field');
  const progressBar = document.querySelector('.progress');
  const mainCheck = document.querySelector('.main-right-check');
  const inputValue = document.querySelector('.form-input');
  progressBar.style.width = `${(index / 20) * 100}%`;

  menuList.innerHTML = '';
  inputValue.value = '';

  userList[lang].forEach(element => {
    let complete = '';
    let hint = '';
    if (element.correct === true) {
      complete = 'complete';
    }
    if (element.hint === true) {
      hint = 'hint';
    }

    const menuItem = `
      <a class="right-main-link" data-number="${element.id}">
        <span class="right-check sub-right-check ${complete}" data-number="${element.id}"></span>
        <span class="right-check-hint ${hint}" data-number="${element.id}"></span>
        <span class="level-number">${element.levelNumber}</span>
        <span class="level-subtitle">${element.levelSubtitle}</span>
      </a>
    `;
    menuList.innerHTML += menuItem;
  });

  mainCheck.dataset.number = `${userList[lang][index].id}`;
  topTitle.innerHTML = userList[lang][index].topTitle;
  rightTitle.innerHTML = userList[lang][index].descriptionTitle;
  rightSubtitle.innerHTML = userList[lang][index].descriptionSubtitle;
  selectorName.innerHTML = userList[lang][index].selector;
  conditionTask.innerHTML = userList[lang][index].condition;
  examplesOne.innerHTML = `${userList[lang][index].examples} ${userList[lang][index].examples2}`;
  levelCount.innerHTML = `${Number(userList[lang][index].id) + 1} of ${userList[lang].length}`;
  gameField.innerHTML = userList[lang][index].gameField;
  gameVisual.innerHTML = userList[lang][index].game;
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

export default createDom;
