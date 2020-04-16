import { getState, dispatch } from "../../store";
import { actions } from "../../constants";
import "./playbutton.css";
import repeat from "../../assets/img/repeat.svg";

class PlayButton {
  button = null;
  audio = null;

  constructor() {
    this.button = document.querySelector(".play-button");
    this.button.append("Start game");

    this.button.addEventListener("click", this.startGame);

    return this;
  }

  checkAvaliable = () => {
    if (!getState().play || window.location.hash === "") {
      this.button.classList.add("play-button-hide");
    } else {
      this.button.classList.remove("play-button-hide");
      this.button.innerHTML = "";
      if (getState().gameMode) {
        const image = document.createElement("img");
        image.setAttribute("src", repeat);
        image.setAttribute("alt", "Repeat");
        image.setAttribute("width", "30px");
        this.button.append(image);
        this.button.classList.add("playing");
      } else {
        this.button.append("Start game");
        this.button.classList.remove("playing");
        this.button.removeEventListener("click", this.replayAudio);
        this.button.addEventListener("click", this.startGame);
      }
    }
  };

  switchMode = () => {
    if (getState().play) {
      this.button.classList.remove("play-button-hide");
    } else {
      this.button.classList.add("play-button-hide");
    }
  };

  startGame = () => {
    dispatch({ type: actions.START_GAME, payload: this.nextGuess });
    // this.audio = new Audio(getState().currentGame.currentCard.audioSrc);
    this.nextGuess(getState().currentGame.currentCard);
    // this.replayAudio();

    this.button.removeEventListener("click", this.startGame);
    this.button.addEventListener("click", this.replayAudio);
  };

  nextGuess = card => {
    if (!card) {
      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      var p = document.getElementById("victory");
      p.textContent = `correct: ${getState().currentGame.correct}
      incorrect: ${getState().currentGame.incorrect}`;

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
        window.location = window.location.origin;
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = event => {
        if (event.target == modal) {
          modal.style.display = "none";
          window.location = window.location.origin;
        }
      };
      dispatch({ type: actions.FINISH_GAME });
    } else {
      this.audio = new Audio(card.audioSrc);
      this.audio.load();
      setTimeout(() => {
        this.replayAudio();
      }, 1000);
    }
  };

  replayAudio = () => {
    this.audio.play();
  };
}

export default PlayButton;
