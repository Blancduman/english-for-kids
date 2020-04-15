import "./card.css";

class Card {
  card = null;

  constructor({ image, title, translation, audioSrc, gameMode = false }) {
    this.card = this.renderCard(image, title, translation, audioSrc, gameMode);

    return this.card;
  }

  renderCard(image, title, translation, audioSrc, gameMode) {
    const card = document.createElement("div");
    card.classList.add("flip-card");

    const img = document.createElement("img");
    img.setAttribute("alt", title);
    img.setAttribute("src", image);
    img.classList.add("card__image");

    card.append(img);

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");
    card.append(flipCardInner);

    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    flipCardInner.append(flipCardFront);

    const engTitle = document.createElement("h3");
    engTitle.textContent = title;
    flipCardFront.append(engTitle);

    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardInner.append(flipCardBack);

    const rusTitle = document.createElement("h3");
    rusTitle.textContent = translation;
    flipCardBack.append(rusTitle);

    return card;
  }

  switchMode(gameMode) {
    if (gameMode) {
      this.card.classList.remove("game-card");
      this.card.classList.add("card");
    } else {
      this.card.classList.remove("card");
      this.card.classList.add("game-card");
    }
  }
}

export default Card;
