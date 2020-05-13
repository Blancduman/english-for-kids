import { getState, dispatch } from '../../store';
import { actions } from '../../constants';
import Base from '../../helpers/baseClass';
import './toggle.css';

export default class Toggle extends Base {
  toggle;
  input;

  modeChanger = (mode) => {
    if (mode) {
      document.body.classList.add('game');
    } else {
      document.body.classList.remove('game');
    }
  };

  onChangeToggle = () => {
    dispatch({ type: actions.CHANGE_MODE, payload: !getState().play });
    this.modeChanger(getState().play);

    this.input.checked = getState().play;
  };
  constructor() {
    super();
    this.modeChanger(getState().play);

    const on = this.createElement('span', { class: 'play' }, {}, 'PLAY');
    const off = this.createElement('span', { class: 'train' }, {}, 'TRAIN');
    const slider = this.createElement(
      'div',
      { class: 'slider round' },
      {},
      on,
      off,
    );
    this.input = this.createElement(
      'input',
      {
        type: 'checkbox',
        id: 'togBtn',
        checked: getState().play,
      },
      { click: this.onChangeToggle },
    );

    this.toggle = this.createElement(
      'label',
      { class: 'switch' },
      {},
      this.input,
      slider,
    );

    return this;
  }
}
