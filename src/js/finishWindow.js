function createWindow() {
  const allCompleteTaskCount = [...document.querySelectorAll('.sub-right-check')];
  const allHindTaskCount = [...document.querySelectorAll('.right-check-hint')];
  const topVisual = document.querySelector('.top-visual');
  const mainBottomBlock = document.querySelector('.main-bottom');
  const helpButton = document.querySelector('.top-hint-link');
  const topTitle = document.querySelector('.top-title');
  const leftCol = document.querySelector('.left-col');
  const rightCol = document.querySelector('.right-col');
  const languagesIcon = document.querySelector('.header-languages');

  let progress = allCompleteTaskCount.filter(item => item.classList.contains('complete')).length;
  let hintcount = allHindTaskCount.filter(item => item.classList.contains('hint')).length;
  if (progress === 20) {
    const lang = localStorage.getItem('lang');
    mainBottomBlock.style.display = 'none';
    topVisual.style.width = '400px';
    topVisual.style.height = 'auto';
    topVisual.style.margin = '0';
    topVisual.style.padding = '0';
    leftCol.style.width = '100%';
    helpButton.style.display = 'none';
    topTitle.style.display = 'none';
    rightCol.style.display = 'none';
    languagesIcon.classList.add('no-active');
    if (lang === 'en') {
      topVisual.innerHTML = `
        <div class="window-victory">
          <h2>Congratulations you have completed all the tasks!!!</h2>
          <p>To do this, you need ${hintcount} hints!!!</p>
          <p>Now you can find a normal job!!!</p>
          <p>P.S. Don't forget to share the link of this app with your friends! Good luck!</p>
          <p>Or you can repeat the tasks to consolidate your knowledge of css.</p>
          <button class="button try-again">Try Again</button>
        </div>
      `;
    } else {
      topVisual.innerHTML = `
        <div class="window-victory">
          <h2>Поздравляем Вы выполнили все задания!!!</h2>
          <p>Чтобы сделать это, Вам понадобилось всего ${hintcount} подсказок!!!</p>
          <p>Теперь Вы точно сможете найти нормальную работу))))</p>
          <p>P.S. Не забудьте поделиться ссылкой на этот тренажёр со своими друзьями! Успехов!!!</p>
          <p>Вы можете закрепить свои знания, пройдя задания ещё раз.</p>
          <button class="button try-again">Попробовать ещё раз!</button>
        </div>
      `;
    }

    const tryAgain = document.querySelector('.try-again');

    tryAgain.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.reload();
    });
  }
}

export default createWindow;
