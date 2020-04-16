import { getState, dispatch } from "../../store";
import { actions } from "../../constants";
import "./card.css";

class Card {
  card = null;
  audio = null;
  img = null;
  word = "";

  constructor(card) {
    const { image, word, translation, audioSrc } = card;
    this.word = word;
    this.card = this.renderCard(image, word, translation, audioSrc);
    return this;
  }

  playAudio = () => {
    this.audio.volume = 0.5;
    this.audio.play();
  };

  renderCard(image, word, translation, audioSrc) {
    this.card = document.createElement("div");
    this.audio = new Audio(audioSrc);

    this.card.classList.add(getState().play ? "game-card" : "flip-card");

    this.img = document.createElement("img");
    this.img.setAttribute("alt", word);
    this.img.setAttribute("src", image);
    this.img.classList.add("card__image");

    this.card.append(this.img);

    if (!getState().play) {
      this.card.addEventListener("click", this.playAudio);
    }
    if (getState().gameMode) {
      this.card.addEventListener("click", this.onClick);
      if (getState().currentGame.answers.findIndex(a => a === word) !== -1) {
        this.img.classList.add("correct");
      }
    } else {
      this.img.classList.remove("correct");
    }

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");
    this.card.append(flipCardInner);

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    flipCardInner.append(flipCardFront);

    const engword = document.createElement("h3");
    engword.textContent = word;
    flipCardFront.append(engword);

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardInner.append(flipCardBack);

    const rusword = document.createElement("h3");
    rusword.textContent = translation;
    flipCardBack.append(rusword);

    return this.card;
  }

  onClick = () => {
    if (!getState().gameFinish) {
      if (this.word === getState().currentGame.currentCard.word) {
        dispatch({ type: actions.CORRECT_ANSWER, payload: this.word });
        this.img.classList.add("correct");
      } else {
        dispatch({ type: actions.INCORRECT_ANSWER });
      }
    }
  };

  switchMode = () => {
    if (getState().play) {
      this.card.classList.remove("flip-card");
      this.card.classList.add("game-card");
      this.card.removeEventListener("click", this.playAudio);
      this.card.addEventListener("click", this.onClick);
    } else {
      this.card.classList.remove("game-card");
      this.card.classList.add("flip-card");
      this.card.removeEventListener("click", this.onClick);
      this.card.addEventListener("click", this.playAudio);
    }
  };
}

export default Card;
