import Card from "../Card";
import "./deck.css";

class Deck {
  cards = [];

  constructor(items) {
    items.forEach(card => {
      this.cards.push(new Card(card));
    });

    return this.cards;
  }

  renderDeck() {
    const deck = document.createElement("div");
    deck.classList.add("deck");
    deck.append(cards);

    return deck;
  }

  switchMode(gameMode) {
    this.cards.forEach(card => card.switchMode(gameMode));
  }
}

export default Deck;
