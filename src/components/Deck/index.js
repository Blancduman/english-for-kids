import Category from "../Category";
import Card from "../Card";
import "./deck.css";

class Deck {
  cards = [];

  constructor(items, isCategory) {
    items.forEach(card => {
      this.cards.push(isCategory ? new Category(card) : new Card(card));
    });

    return this;
  }

  renderDeck() {
    const deck = document.createElement("div");
    deck.classList.add("deck");
    deck.append(...this.cards);

    return deck;
  }

  switchMode(gameMode) {
    this.cards.forEach(card => card.switchMode(gameMode));
  }
}

export default Deck;
