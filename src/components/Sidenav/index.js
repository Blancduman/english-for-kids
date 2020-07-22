import Base from '../../helpers/baseClass';
import { getState } from '../../store';

import './sidenav.css';

export default class Sidenav extends Base {
  button;
  sidenav;
  links;

  constructor() {
    super();

    this.button = this.createElement('span', { class: 'sidenav__open-btn' });
    this.button.onclick = this.open;
    const mainPage = this.createElement(
      'a',
      { href: '/#' },
      { click: this.close },
      'Main Page',
    );
    const categoriesPage = getState().categories.map((category) => this.createElement(
      'a',
      { href: `#category/${category.link}` },
      { click: this.close },
      category.title,
    ));

    const statisticPage = this.createElement(
      'a',
      { href: '#statistics' },
      { click: this.close },
      'Statistics',
    );

    this.links = [mainPage, ...categoriesPage, statisticPage];

    this.sidenav = this.createElement(
      'sidenav',
      { class: 'sidenav' },
      {},
      ...this.links,
    );

    this.startUp();
    this.pathChangeHandler();

    return this;
  }

  startUp = () => {
    window.addEventListener('click', (e) => {
      if (
        !(
          this.sidenav === e.target
          || this.button === e.target
          || this.sidenav === e.target.parentNode
        )
      ) {
        this.close();
      }
    });
  };

  pathChangeHandler = () => {
    requestAnimationFrame(() => {
      const path = window.location.hash;
      this.links.forEach((a) => {
        this.removeClass(a, 'active');
        if (path === a.getAttribute('href')) {
          this.addClass(a, 'active');
        }
      });
      if (path === '') this.addClass(this.links[0], 'active');
    });
  };

  close = () => {
    this.pathChangeHandler();
    this.sidenav.style.width = '0';
    this.removeClass(this.button, 'sidenav__close-btn');
    this.addClass(this.button, 'sidenav__open-btn');
    this.button.onclick = this.open;
  };

  open = () => {
    this.sidenav.style.width = '250px';
    this.removeClass(this.button, 'sidenav__open-btn');
    this.addClass(this.button, 'sidenav__close-btn');
    this.button.onclick = this.close;
  };
}
