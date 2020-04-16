import Category from "../Category";
import Card from "../Card";
import { getState } from "../../store";
import "./deck.css";

class Deck {
  cards = [];

  constructor(items, type) {
    items.forEach(card => {
      this.cards.push(type === "card" ? new Card(card) : new Category(card));
    });

    return this;
  }

  renderDeck() {
    const deck = document.createElement("div");
    deck.classList.add("deck");
    const _cards = this.cards.map(c => c.card);
    deck.append(..._cards);

    return deck;
  }

  switchMode() {
    this.cards.forEach(card => card.switchMode());
  }
}

export default Deck;
