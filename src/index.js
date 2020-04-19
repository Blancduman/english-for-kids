import { categories, cards } from "./resources";
import Sidenav from "./components/Sidenav";
import Deck from "./components/Deck";
import Toggle from "./components/Toggle";
import PlayButton from "./components/PlayButton";
import Star from "./components/Stars";
import { game_modes, actions } from "./constants";
import { getState, dispatch, subscribe } from "./store";
import Statistics from "./components/Statistics";
import "./main.css";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

class EnglishForKids {
  app = null;
  loaded = false;
  header = null;
  sidenav = null;
  toggle = null;
  deck = null;
  currentCategory = "";
  // playButtonHTML = null;
  playButton = null;

  constructor() {
    this.app = document.querySelector(".app");
    // this.playButtonHTML = document.querySelector(".play-button");
    this.playButton = new PlayButton(this.playButtonHTML);
    this.renderMenu();
    this.onRouteChange();
    this.playButton.checkAvaliable();

    subscribe(() => {
      this.renderMenu();
      if (window.location.hash === "") {
        this.renderMainPage();
      } else if (window.location.hash.includes("category")) {
        this.renderCategory();
      }
      this.playButton.checkAvaliable();
      this.saveLocal(getState());
    });

    window.addEventListener("hashchange", this.onRouteChange);
    this.loaded = true;
  }

  saveLocal(obj) {
    // Object.keys(obj).forEach(k => {
    //   localStorage.setItem(k, obj[k]);
    // });
    localStorage.setItem("play", JSON.stringify(obj.play));
    localStorage.setItem("gameMode", JSON.stringify(obj.gameMode));
    localStorage.setItem("statistics", JSON.stringify(obj.statistics));
  }

  renderMainPage = () => {
    this.app.innerHTML = "";
    this.deck = new Deck(getState().cards, "category");

    this.app.append(this.deck.renderDeck());
  };

  renderCategory = () => {
    this.app.innerHTML = "";
    this.deck = new Deck(getState().cards, "card", this.currentCategory);

    this.app.append(this.deck.renderDeck());

    const starContainer = document.createElement("div");
    starContainer.classList.add("deck", "stars");
    this.app.append(starContainer);
    const { correct, incorrect } = getState().currentGame;
    if (correct !== 0) {
      starContainer.append(...new Star(correct, "win"));
    }
    if (incorrect !== 0) {
      starContainer.append(...new Star(incorrect));
    }
  };

  // renderPlayButton = () => {
  //   this.playButtonHTML.innerHTML = "";
  //   this.playButtonHTML.append(this.playButton.button);
  // };

  onRouteChange = () => {
    this.app.innerHTML = "";
    if (window.location.hash === "") {
      const showCategories = getState().categories.map((c, index) => {
        return {
          image: cards[index][2].image,
          title: c,
          link: c.replace(/\s/g, "").toLowerCase()
        };
      });

      dispatch({
        type: actions.SET_CARDS,
        payload: { cards: showCategories }
      });
      dispatch({
        type: actions.ABBONDED_GAME
      });
      this.renderMainPage();
    } else if (window.location.hash.includes("category")) {
      const category = window.location.hash.split("/").pop();
      const index = getState().categories.findIndex(ca => {
        if (ca.replace(/\s/g, "").toLowerCase() === category) {
          this.currentCategory = ca;
          return true;
        }
        return false;
      });
      if (index === -1) {
        window.location.replace(window.location.origin);
      }
      dispatch({
        type: actions.SET_CARDS,
        payload: { cards: cards[index], currentCategory: index }
      });
      dispatch({
        type: actions.ABBONDED_GAME
      });

      this.renderCategory();
    } else if (window.location.hash.includes("statistics")) {
      this.playButton.checkAvaliable();
      const table = new Statistics();
      this.app.append(table);
    }
  };

  onChangeToggle = value => {
    dispatch({ type: actions.CHANGE_MODE, payload: value });
    dispatch({
      type: actions.ABBONDED_GAME
    });
    localStorage.setItem("play", getState().play);
    if (this.deck !== null) this.deck.switchMode(getState().play);
    this.playButton.switchMode(getState().play);
  };

  renderMenu() {
    if (!this.loaded) {
      this.header = document.createElement("header");
      this.toggle = new Toggle(getState().play, this.onChangeToggle);
      this.sidenav = new Sidenav(getState().categories);

      this.header.classList.add("header");
      this.header.append(this.sidenav.buttonOpen);
      this.header.append(this.toggle.toggle);
      document.body.prepend(this.sidenav.sideNav);
      document.body.prepend(this.header);
    }
  }
}

window.addEventListener("load", () => {
  const ek = new EnglishForKids();
});
