import { categories, cards } from "./resources";
import Route from "./Route";
import Router from "./Router";
import Sidenav from "./components/Sidenav";
import Deck from "./components/Deck";
import Toggle from "./components/Toggle";
import { game_modes } from "./constants";
import "./main.css";

class EnglishForKids {
  app = null;
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
    const app = document.querySelector(".app");
    const header = document.createElement("header");
    header.classList.add("header");
    app.append(header);
    const toggle = new Toggle(this.play);
    const sidenav = new Sidenav(this.categories);
    header.append(sidenav.buttonOpen);
    header.append(toggle.toggle);
    app.append(sidenav.sideNav);
    const showCard = categories.map((c, index) => {
      return {
        image: cards[index][2].image,
        title: c,
        link: c.replace(/\s/g, "").toLowerCase(),
        gameMode: this.play
      };
    });
    const deck = new Deck(showCard);
    app.append(deck.renderDeck());
  }
}

window.addEventListener("load", () => {
  const ek = new EnglishForKids();
  console.log(window.location.pathname);
});
