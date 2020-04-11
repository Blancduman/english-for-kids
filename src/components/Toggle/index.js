import { GAME_MODE, TRAINING_MODE } from "../../constants";

class Toggle {
  toggle = null;
  mode = false;

  constructor(checkedValue) {
    const label = document.createElement("label");
    label.classList.add("toggle-switch", "large");

    this.mode = document.createElement("input");
    this.mode.setAttribute("type", "checkbox");
    this.mode.checked = checkedValue;
    label.append(this.mode);

    const optionContainer = document.createElement("span");
    label.append(optionContainer);

    const first = document.createElement("span");
    first.innerText = "TRAIN";
    optionContainer.append(first);

    const second = document.createElement("span");
    second.innerText = "PLAY";
    optionContainer.append(second);

    const a = document.createElement("a");
    label.append(a);

    this.toggle = label;
  }

  switchMode() {
    this.mode.checked = !this.mode.checked;
  }
}

export default Toggle;
