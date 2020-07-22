import { getState, dispatch } from '../../store';
import { actions } from '../../constants';
import Base from '../../helpers/baseClass';
import './card.css';

export default class Card extends Base {
  audio;
  front;
  back;
  holder;
  img;
  rotationTimer;
  card;
  word;
  category;
  renderWord = (word) => this.createElement('h3', {}, {}, word);
  renderCard = (className, events = {}) => this.createElement('div', { class: className }, events);
  playAudio = () => this.audio.play();

  onMouseOver = () => {
    if (!getState().play) {
      clearTimeout(this.rotationTimer);
      this.addClass(this.holder, 'rotation');
    }
  };

  onMouseLeave = () => {
    if (!getState().play) {
      this.rotationTimer = setTimeout(() => {
        this.removeClass(this.holder, 'rotation');
      }, 800);
    }
  };

  onClick = () => {
    if (!getState().play) {
      this.playAudio().then();
      dispatch({
        type: actions.STATISTIC_PLUS_CLICKED,
        payload: {
          word: this.word,
          category: this.category ? this.category.link : null,
        },
      });
    } else if (!getState().gameFinish && getState().gameMode) {
      if (!this.img.classList.contains('correct')) {
        if (this.checkCard(this.word)) this.addClass(this.img, 'correct');
      }
    }
  };

  constructor({
    image, word, translation, audioSrc, category,
  }, checkCard) {
    super();
    this.audio = new Audio(audioSrc);
    this.front = this.appendChildren(
      this.renderCard('front'),
      this.renderWord(word),
    );
    this.back = this.appendChildren(
      this.renderCard('back'),
      this.renderWord(translation),
    );
    this.holder = this.appendChildren(
      this.renderCard('holder', {
        mouseover: this.onMouseOver,
        mouseleave: this.onMouseLeave,
      }),
      this.front,
      this.back,
    );
    this.img = this.createElement('img', {
      alt: word,
      src: image,
      class: 'card__image',
    });

    this.card = this.createElement(
      'div',
      {
        class: 'card',
      },
      {
        click: this.onClick,
      },
      this.img,
      this.holder,
    );
    this.word = word;
    this.category = category;
    this.checkCard = checkCard;

    return this;
  }
}
