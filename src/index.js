import { categories, cards } from "./resources";
import Route from "./Route";
import Router from "./Router";
import Sidenav from "./components/Sidenav";
import Deck from "./components/Deck";
import Toggle from "./components/Toggle";
import { game_modes } from "./constants";
import "./main.css";

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

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
    this.app = document.querySelector(".app");
    this.renderMenu();
    this.onRouteChange();

    window.addEventListener("hashchange", this.onRouteChange);
  }

  onRouteChange = () => {
    this.app.innerHTML = "";
    console.log(window.location);
    if (window.location.hash === "") {
      const showCategories = categories.map((c, index) => {
        return {
          image: cards[index][2].image,
          title: c,
          link: c.replace(/\s/g, "").toLowerCase()
        };
      });
      const deck = new Deck(showCategories, true);
      this.app.append(deck.renderDeck());
    } else if (window.location.hash.includes("category")) {
      const category = window.location.hash.split("/").pop();
      const index = this.categories.findIndex(
        ca => ca.replace(/\s/g, "").toLowerCase() === category
      );
      if (index === -1) window.location.replace(window.location.origin);
      this.cards = shuffle(cards[index]);
      const showCards = this.cards.map(c => {
        return {
          image: c.image,
          title: c.word,
          translation: c.translation,
          audioSrc: c.audioSrc
        };
      });
      const deck = new Deck(showCards);
      this.app.append(deck.renderDeck());
    }
  };

  renderMenu() {
    const header = document.createElement("header");
    const toggle = new Toggle(this.play);
    const sidenav = new Sidenav(this.categories);

    header.classList.add("header");
    header.append(sidenav.buttonOpen);
    header.append(toggle.toggle);

    document.body.prepend(sidenav.sideNav);
    document.body.prepend(header);
  }
}

window.addEventListener("load", () => {
  const ek = new EnglishForKids();
});
