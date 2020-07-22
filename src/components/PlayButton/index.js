import Base from '../../helpers/baseClass';
import { getState, dispatch } from '../../store';
import { actions } from '../../constants';
import repeat from '../../assets/img/repeat.svg';
import victoryImg from '../../assets/img/victroyDrake.png';
import defeatImg from '../../assets/img/defeatDrake.png';

import './playbutton.css';

const perfectAudio = new Audio('../../assets/audio/perfect.mp3');
const bruhAudio = new Audio('../../assets/audio/bruh.mp3');

export default class PlayButton extends Base {
  button;
  audio;
  modal;
  closeButton;
  feedBack;

  closeModal = () => {
    this.modal.style.display = 'none';
    this.createElement('a', { href: '/#' }).click();
  };

  constructor() {
    super();

    this.button = document.querySelector('.play-button');
    this.modal = document.getElementById('myModal');
    this.closeButton = document.querySelector('span.close');
    this.closeButton.onclick = this.closeModal;
    this.feedBack = document.getElementById('result');
    this.appendChildren(this.button, 'Start game');

    this.button.addEventListener('click', this.startGame);

    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    };
    return this;
  }

  toggleButton = () => {
    if (!(getState().play && window.location.hash.includes('category'))) {
      this.addClass(this.button, 'play-button-hide');
    } else this.removeClass(this.button, 'play-button-hide');
  };

  onPlayMode = () => {
    this.appendChildren(
      this.button,
      this.createElement('img', {
        src: repeat,
        alt: 'Repeat',
        width: '30px',
      }),
    );
    this.addClass(this.button, 'playing');
  };

  onTrainMode = () => {
    this.appendChildren(this.button, 'Start game');
    this.removeClass(this.button, 'playing');
    this.button.removeEventListener('click', this.replayAudio);
    this.button.addEventListener('click', this.startGame);
  };

  checkAvailable = () => {
    this.toggleButton();
    this.button.innerHTML = '';

    if (getState().gameMode) this.onPlayMode();
    else this.onTrainMode();
  };

  createFeedBack = (image, alt, text) => {
    const feedBackImage = this.createElement('img', {
      src: image,
      alt,
    });
    const span = this.createElement('span', { class: 'result-text' }, {}, text);
    this.appendChildren(this.feedBack, feedBackImage, span);
  };

  finishGame = (result) => {
    this.feedBack.innerHTML = '';
    if (result) {
      perfectAudio.play().then(() => {});
      this.createFeedBack(victoryImg, 'Victory', 'Perfect!');
    } else {
      bruhAudio.play().then(() => {});
      this.createFeedBack(
        defeatImg,
        'Defeat',
        `${getState().currentGame.incorrect} mistake(s)... Bruh..`,
      );
    }
    this.modal.style.display = 'block';
  };

  replayAudio = () => {
    this.audio.play();
  };

  createNewGuess = (card) => {
    if (card) {
      this.audio = new Audio(card.audioSrc);
      this.audio.load();

      setTimeout(() => {
        this.replayAudio();
      }, 1000);
    } else {
      this.finishGame(getState().currentGame.incorrect === 0);
      dispatch({ type: actions.FINISH_GAME });
    }
  };

  startGame = () => {
    dispatch({ type: actions.START_GAME, payload: this.createNewGuess });
    this.createNewGuess(getState().currentGame.currentCard);

    this.button.removeEventListener('click', this.startGame);
    this.button.addEventListener('click', this.replayAudio);
  };
}
