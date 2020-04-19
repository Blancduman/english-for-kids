import { getState } from "../../store";
import { categories } from "../../resources";
import "./statistics.css";

class Statistics {
  table = null;
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
    return this.table;
  }
  sortTable(column, way) {
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
      this.sortTable(0, rotation(fWord));
    });
    const hTranslation = document.createElement("th");
    hTranslation.textContent = "Translation";
    hTranslation.addEventListener("click", () => {
      fTranslation = rotation(fTranslation);
      this.sortTable(1, rotation(fTranslation));
    });
    const hAmountClicks = document.createElement("th");
    hAmountClicks.textContent = "Clicks";
    hAmountClicks.addEventListener("click", () => {
      fClicks = rotation(fClicks);
      this.sortTable(2, rotation(fClicks));
    });
    const hGuessed = document.createElement("th");
    hGuessed.textContent = "Guessed";
    hGuessed.addEventListener("click", () => {
      fGuessed = rotation(fGuessed);
      this.sortTable(3, rotation(fGuessed));
    });
    const hMistakes = document.createElement("th");
    hMistakes.textContent = "Mistakes";
    hMistakes.addEventListener("click", () => {
      fMistakes = rotation(fMistakes);
      this.sortTable(4, rotation(fMistakes));
    });
    const hProcentMistakes = document.createElement("th");
    hProcentMistakes.textContent = "%";
    hProcentMistakes.addEventListener("click", () => {
      fProcent = rotation(fProcent);
      this.sortTable(5, fProcent);
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
