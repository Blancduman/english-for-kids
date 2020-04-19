import { getState, dispatch } from "../../store";
import { actions } from "../../constants";
import "./playbutton.css";
import repeat from "../../assets/img/repeat.svg";
import victoryImg from "../../assets/img/victroyDrake.png";
import defeatImg from "../../assets/img/defeatDrake.png";
// import victorySoundEffect from "../../assets/audio/perfect.mp3";
// import defeatSoundEffect from "../../assets/audio/bruh.mp3";

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
    if (!getState().play || !window.location.hash.includes("category")) {
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
    if (window.location.hash.includes("category"))
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
      var result = document.getElementById("result");
      result.innerHTML = "";
      // result.textContent = `correct: ${getState().currentGame.correct}
      // incorrect: ${getState().currentGame.incorrect}`;
      if (getState().currentGame.incorrect === 0) {
        new Audio("assets/audio/perfect.mp3").play();
        const vicotryImage = document.createElement("img");
        // vicotryImage.setAttribute("width", "100%");
        vicotryImage.setAttribute("src", victoryImg);
        result.append(vicotryImage);
        const spanchik = document.createElement("span");
        spanchik.style = "display: block;font-size: 40px;color: red;";
        spanchik.textContent = "Perfect!";
        result.append(spanchik);
      } else {
        new Audio("assets/audio/bruh.mp3").play();
        const defeatImage = document.createElement("img");
        // defeatImage.setAttribute("width", "100%");
        defeatImage.setAttribute("src", defeatImg);
        result.append(defeatImage);
        const spanchik = document.createElement("span");
        spanchik.style = "display: block;font-size: 40px;color: red;";
        spanchik.textContent = `${
          getState().currentGame.incorrect
        } mistake(s)... Bruh..`;
        result.append(spanchik);
      }

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
