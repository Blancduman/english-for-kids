import "./card.css";

class Card {
  card = null;

  constructor({ image, title, link, gameMode = false }) {
    this.card = this.renderCard(image, title, link, gameMode);

    return this.card;
  }

  renderCard(image, title, link, gameMode) {
    const card = document.createElement("div");
    card.classList.add(gameMode ? "game-card" : "card", "gradient-card");

    const cardImage = document.createElement("div");
    cardImage.classList.add("card__image");
    cardImage.style.backgroundImage = `url(${image})`;
    card.append(cardImage);

    const a = document.createElement("a");
    a.setAttribute("href", link);
    cardImage.append(a);

    const holder = document.createElement("div");
    holder.classList.add("card__mask", "gradient-rgba");
    a.append(holder);

    const content = document.createElement("div");
    content.classList.add("card__content");
    holder.append(content);

    const header = document.createElement("h3");
    header.classList.add("card__title");
    header.innerText = title;

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
