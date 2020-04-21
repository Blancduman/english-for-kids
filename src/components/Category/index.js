import "./category.css";

class Category {
  card = null;

  constructor({ image, title, link }) {
    this.card = this.renderCard(image, title, link);

    return this;
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

  renderCard(image, title, link) {
    const a = document.createElement("a");
    a.classList.add("clickable-category");
    a.setAttribute("href", `#category/${link}`);

    const card = document.createElement("div");
    card.classList.add("category");
    card.style.backgroundImage = `url(./${image})`;
    a.append(card);

    const cardMask = document.createElement("div");
    cardMask.classList.add("category__mask");
    cardMask.style.borderColor = `rgba(${this.getRandomColor()}, 0.3)`;
    card.append(cardMask);

    const content = document.createElement("div");
    content.classList.add("category__content");
    cardMask.append(content);

    const header = document.createElement("h3");
    header.classList.add("category__title");
    header.innerText = title;
    content.append(header);

    return a;
  }

  switchMode() {}
}

export default Category;
