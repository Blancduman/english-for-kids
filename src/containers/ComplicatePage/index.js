import Base from '../../helpers/baseClass';
import Card from '../../components/Card';
import { getState } from '../../store';

export default class ComplicatePage extends Base {
  cardList;
  Page;

  checkCard = () => {};

  sortTable(table) {
    const sortedTable = table;
    let switching; let i; let x; let y; let
      shouldSwitch;
    switching = true;
    while (switching) {
      switching = false;
      for (i = 1; i < sortedTable.length - 1; i += 1) {
        shouldSwitch = false;
        x = sortedTable[i].weight;
        y = sortedTable[i + 1].weight;
        if (x > y) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        const tmp = sortedTable[i];
        sortedTable[i] = sortedTable[i + 1];
        sortedTable[i + 1] = tmp;
        switching = true;
      }
    }
    return sortedTable;
  }

  findWord = () => {
    const { statistics, categories, cards } = getState();
    let words = categories.reduce((result, item, i) => {
      let newResult = result;
      statistics[item.title].forEach((statisticItem, index) => {
        const { image, audioSrc } = cards[i][index];
        const {
          word,
          translation,
          gameMode: { mistakes, attempts, guessed },
        } = statisticItem;
        if (attempts !== 0 && guessed !== attempts) {
          const card = {
            word,
            translation,
            audioSrc,
            image,
            category: categories[i],
            weight: mistakes / attempts,
          };
          newResult = [...newResult, card];
        }
      });
      return newResult;
    }, []);

    words = this.sortTable(words);
    if (words.length > 8) {
      words.length = 8;
    }

    return words;
  };

  renderComplicate() {
    this.cardList = this.findWord().map((card) => new Card(card));

    this.Page = this.createElement(
      'main',
      { class: 'main' },
      {},
      ...this.cardList.map((cardItem) => cardItem.card),
    );
  }

  constructor() {
    super();

    this.renderComplicate();

    return this;
  }
}
