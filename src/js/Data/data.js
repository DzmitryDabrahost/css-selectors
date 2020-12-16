import en from './en';
import ru from './ru';

function createData() {
  const engList = [];
  const rusList = [];

  const userDataList = [];

  en.forEach((item) => {
    const task = {
      id: item.id,
      topTitle: item.topTitle,
      descriptionTitle: item.descriptionTitle,
      descriptionSubtitle: item.descriptionSubtitle,
      selector: item.selector,
      condition: item.condition,
      examples: item.examples,
      examples2: item.examples2,
      levelNumber: item.levelNumber,
      levelSubtitle: item.levelSubtitle,
      game: item.game,
      gameField: item.gameField,
      answer: item.answer,
      hint: false,
      correct: false
    };
    engList.push(task);
  });

  ru.forEach((item) => {
    const task = {
      id: item.id,
      topTitle: item.topTitle,
      descriptionTitle: item.descriptionTitle,
      descriptionSubtitle: item.descriptionSubtitle,
      selector: item.selector,
      condition: item.condition,
      examples: item.examples,
      examples2: item.examples2,
      levelNumber: item.levelNumber,
      levelSubtitle: item.levelSubtitle,
      game: item.game,
      gameField: item.gameField,
      answer: item.answer,
      hint: false,
      correct: false
    };
    rusList.push(task);
  });

  userDataList.push(engList, rusList);
  localStorage.setItem('userList', JSON.stringify(userDataList));
}

export default createData;
