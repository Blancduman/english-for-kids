import { getState } from "../../store";
import { categories } from "../../resources";
import "./statistics.css";

class Statistics {
  table = null;
  reset = null;
  hard = null;
  buttonContainer = null;
  constructor() {
    this.table = document.createElement("table");
    this.table.classList.add("statistics");

    this.table.append(this.renderHeaders());
    const lines = [];
    const { statistics } = getState();
    for (let i = 0; i < categories.length; i++) {
      statistics[categories[i]].forEach(st => {
        const tr = document.createElement("tr");
        const {
          word,
          translation,
          train_mode: { amount_clicks },
          game_mode: { guessed, mistakes, tryes }
        } = st;
        const tdWord = document.createElement("td");
        tdWord.classList.add("fixed-side");
        tdWord.textContent = word;
        const tdTrainslation = document.createElement("td");
        tdTrainslation.textContent = translation;
        const tdClicks = document.createElement("td");
        tdClicks.textContent = amount_clicks;
        const tdGuessed = document.createElement("td");
        tdGuessed.textContent = guessed;
        const tdMistakes = document.createElement("td");
        tdMistakes.textContent = mistakes;
        const tdProcents = document.createElement("td");
        tdProcents.textContent = mistakes === tryes ? "" : mistakes / tryes;
        tr.append(
          tdWord,
          tdTrainslation,
          tdClicks,
          tdGuessed,
          tdMistakes,
          tdProcents
        );
        lines.push(tr);
      });
    }
    this.table.append(...lines);
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("button-container");
    this.reset = document.createElement("button");
    this.reset.classList.add("statistic-button");
    this.reset.textContent = "Reset";
    this.reset.addEventListener("click", () => {
      localStorage.clear();
      window.location.replace(window.location.origin);
    });
    this.buttonContainer.append(this.reset);
    this.hard = document.createElement("button");
    this.hard.classList.add("statistic-button");
    this.hard.textContent = "Repeat difficult words";
    this.hard.addEventListener("click", () => {
      // window.location.hash.replace("complicate");
      const tmp = document.createElement("a");
      tmp.setAttribute("href", "/#complicate");
      tmp.click();
    });
    this.buttonContainer.append(this.hard);
    this.changeColor();
    return this;
  }

  changeColor = () => {
    if (getState().play) {
      this.table.classList.remove("notplay");
      this.table.classList.add("play");
      this.reset.classList.add("button-play");
      this.hard.classList.add("button-play");
      this.reset.classList.remove("button-notplay");
      this.hard.classList.remove("button-notplay");
    } else {
      this.table.classList.add("notplay");
      this.table.classList.remove("play");
      this.reset.classList.remove("button-play");
      this.hard.classList.remove("button-play");
      this.reset.classList.add("button-notplay");
      this.hard.classList.add("button-notplay");
    }
  };
  sortTable(column, way, numberical = false) {
    var tabl, rows, switching, i, x, y, shouldSwitch;
    tabl = document.querySelector(".statistics");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = tabl.rows;
      /*Loop through all table rows (except the
        first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
            one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[column];
        y = rows[i + 1].getElementsByTagName("TD")[column];
        //check if the two rows should switch place:
        if (numberical) {
          if (Number(x.innerHTML) > Number(y.innerHTML) && way === "a") {
            shouldSwitch = true;
            break;
          }
          if (Number(x.innerHTML) < Number(y.innerHTML) && way === "d") {
            shouldSwitch = true;
            break;
          }
        } else {
          if (
            x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() &&
            way === "a"
          ) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          } else if (
            x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() &&
            way === "d"
          ) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  renderHeaders() {
    function rotation(w) {
      if (w === "") {
        w = "a";
      } else if (w === "a") {
        w = "d";
      } else if (w === "d") {
        w = "a";
      }
      return w;
    }
    let fWord = "";
    let fTranslation = "";
    let fClicks = "";
    let fGuessed = "";
    let fMistakes = "";
    let fProcent = "";
    const header = document.createElement("tr");
    const hWord = document.createElement("th");
    hWord.textContent = "Word";
    hWord.addEventListener("click", () => {
      fWord = rotation(fWord);
      this.sortTable(0, fWord);
    });
    const hTranslation = document.createElement("th");
    hTranslation.textContent = "Translation";
    hTranslation.addEventListener("click", () => {
      fTranslation = rotation(fTranslation);
      this.sortTable(1, fTranslation);
    });
    const hAmountClicks = document.createElement("th");
    hAmountClicks.textContent = "Clicks";
    hAmountClicks.addEventListener("click", () => {
      fClicks = rotation(fClicks);
      this.sortTable(2, fClicks, true);
    });
    const hGuessed = document.createElement("th");
    hGuessed.textContent = "Guessed";
    hGuessed.addEventListener("click", () => {
      fGuessed = rotation(fGuessed);
      this.sortTable(3, fGuessed, true);
    });
    const hMistakes = document.createElement("th");
    hMistakes.textContent = "Mistakes";
    hMistakes.addEventListener("click", () => {
      fMistakes = rotation(fMistakes);
      this.sortTable(4, fMistakes, true);
    });
    const hProcentMistakes = document.createElement("th");
    hProcentMistakes.textContent = "%";
    hProcentMistakes.addEventListener("click", () => {
      fProcent = rotation(fProcent);
      this.sortTable(5, fProcent, true);
    });
    header.append(
      hWord,
      hTranslation,
      hAmountClicks,
      hGuessed,
      hMistakes,
      hProcentMistakes
    );

    return header;
  }
}

export default Statistics;
