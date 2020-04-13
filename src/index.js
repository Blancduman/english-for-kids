import { categories, cards } from "./resources";
import Route from "./Route";
import Router from "./Router";
import Sidenav from "./components/Sidenav";
import Deck from "./components/Deck";
import { game_modes } from "./constants";

class EnglishForKids {
  section = 0;
  currentCard = 0;
  play = false;
  cards = [];
  errors = 0;
  endGame = false;
  volume = 100;
  categories = categories;

  routes = null;

  constructor() {
    const sidenav = new Sidenav(this.categories);
    document.body.append(sidenav.buttonOpen);
    document.body.append(sidenav.sideNav);
    const showCard = categories.map((c, index) => {
      return {
        image: cards[index][0].image,
        title: c,
        link: c.replace(/\s/g, "").toLowerCase(),
        gameMode: this.play
      };
    });
    const deck = new Deck(showCard);
    document.body.append(deck.renderDeck());
  }
}

window.addEventListener("load", () => {
  const ek = new EnglishForKids();
});
