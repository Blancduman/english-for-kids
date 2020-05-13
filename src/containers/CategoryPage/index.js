import Base from '../../helpers/baseClass';
import Card from '../../components/Card';
import Stars from '../../components/Stars';
import { getState, dispatch } from '../../store';
import { actions } from '../../constants';

const correctAudio = new Audio('assets/audio/correct.mp3');
const incorrectAudio = new Audio('assets/audio/error.mp3');

export default class CategoryPage extends Base {
  cardList;
  stars;
  Page;

  // eslint-disable-next-line consistent-return
  checkCard = (word) => {
    if (word === getState().currentGame.currentCard.word) {
      dispatch({
        type: actions.CORRECT_ANSWER,
        payload: word,
      });
      correctAudio.play();
      this.stars.addStar('win');

      return true;
    }
    dispatch({
      type: actions.INCORRECT_ANSWER,
    });
    incorrectAudio.play();
    this.stars.addStar('not win');

    return false;
  };

  renderCardList = (cards) => cards.map((card) => new Card(card, this.checkCard));

  constructor() {
    super();
    const { currentCategory, categories, cards } = getState();
    const index = categories.findIndex((cate) => cate.link === currentCategory);
    this.cardList = this.renderCardList(cards[index === -1 ? 0 : index]);
    this.stars = new Stars();
    this.Page = this.createElement(
      'main',
      { class: 'main' },
      {},
      ...this.cardList.map((cardItem) => cardItem.card),
    );

    return this;
  }
}
