import "./card.css";

class Card {
  card = null;

  constructor({ image, title, link, gameMode = false }) {
    this.card = this.renderCard(image, title, link, gameMode);

    return this.card;
  }

  hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return this.hexToRgb(color);
  }

  renderCard(image, title, link, gameMode) {
    const a = document.createElement("a");
    a.classList.add("clickable-card");
    a.setAttribute("href", `category/${link}`);
    // a.append(holder);

    const card = document.createElement("div");
    card.classList.add(gameMode ? "game-card" : "card", "play-card");
    card.style.backgroundImage = `url(./${image})`;
    a.append(card);

    const cardMask = document.createElement("div");
    cardMask.classList.add("card__mask");
    cardMask.style.borderColor = `rgba(${this.getRandomColor()}, 0.3)`;
    card.append(cardMask);

    const content = document.createElement("div");
    content.classList.add("card__content");
    cardMask.append(content);

    const header = document.createElement("h3");
    header.classList.add("card__title");
    header.innerText = title;
    content.append(header);

    return a;
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
