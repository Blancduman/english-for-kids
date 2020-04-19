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
  table = null;

  constructor() {
    this.app = document.querySelector(".app");
    // this.playButtonHTML = document.querySelector(".play-button");
    this.playButton = new PlayButton(this.playButtonHTML);
    this.onRouteChange();
    this.renderMenu();
    this.playButton.checkAvaliable();

    subscribe(() => {
      this.renderMenu();
      if (window.location.hash === "") {
        this.renderMainPage();
      }
      // else if (
      //   window.location.hash.includes("category") ||
      //   window.location.hash.includes("complicate")
      // ) {
      //   this.renderCategory();
      // }
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
      document.title = "Main Page";

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
      document.title = this.currentCategory;
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
      this.table = new Statistics();
      this.table.changeColor();
      this.app.append(this.table.table);
      this.app.append(this.table.buttonContainer);
      document.title = "Statistic";
    } else if (window.location.hash.includes("complicate")) {
      document.title = "This words are complicate for my boi, keep working!";
      let lines = [];
      const { statistics } = getState();
      for (let i = 0; i < categories.length; i++) {
        statistics[categories[i]].forEach((st, index) => {
          const { image, audioSrc } = cards[i][index];
          const {
            word,
            translation,
            game_mode: { mistakes, tryes }
          } = st;
          const lCard = {
            word,
            translation,
            audioSrc: audioSrc,
            image: image,
            category: categories[i],
            weight: mistakes / tryes
          };
          lines.push(lCard);
        });
      }
      lines = this.sortTable(lines);
      if (lines.length > 8) {
        lines.length = 8;
      }
      dispatch({
        type: actions.SET_CARDS,
        payload: { cards: lines, currentCategory: -1 }
      });
      dispatch({
        type: actions.ABBONDED_GAME
      });
      this.renderCategory();
    }
  };

  sortTable(tabl) {
    var switching, i, x, y, shouldSwitch;
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      /*Loop through all table rows (except the
        first, which contains table headers):*/
      for (i = 1; i < tabl.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
            one from current row and one from the next:*/
        x = tabl[i].weight;
        y = tabl[i + 1].weight;
        //check if the two rows should switch place:
        if (x > y) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
        // tabl[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        const tmp = tabl[i];
        tabl[i] = tabl[i + 1];
        tabl[i + 1] = tmp;
        switching = true;
      }
    }
    return tabl;
  }

  onChangeToggle = value => {
    dispatch({ type: actions.CHANGE_MODE, payload: value });
    dispatch({
      type: actions.ABBONDED_GAME
    });
    localStorage.setItem("play", getState().play);
    if (this.deck !== null) this.deck.switchMode(getState().play);
    this.playButton.switchMode(getState().play);
    this.sidenav.changeColor();
    if (this.table) this.table.changeColor();
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
