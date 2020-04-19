import { game_modes } from "../../constants";
import "./toggle.css";
class Toggle {
  toggle = null;
  mode = false;

  constructor(checkedValue, onChangeToggle) {
    const label = document.createElement("label");
    label.classList.add("toggle-switch", "large");

    this.mode = document.createElement("input");
    this.mode.setAttribute("type", "checkbox");
    label.addEventListener("click", () => {
      this.mode.checked = !this.mode.checked;
      onChangeToggle(this.mode.checked);
    });
    label.append(this.mode);

    const optionContainer = document.createElement("span");
    label.append(optionContainer);

    const first = document.createElement("span");
    first.innerText = game_modes.TRAINING_MODE;
    optionContainer.append(first);

    const second = document.createElement("span");
    second.innerText = game_modes.GAME_MODE;
    optionContainer.append(second);

    const a = document.createElement("a");
    label.append(a);

    this.toggle = label;
    this.mode.checked = checkedValue;
  }
}

export default Toggle;
