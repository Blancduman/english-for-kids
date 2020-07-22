import Base from './helpers/baseClass';
import CategoryPage from './containers/CategoryPage';
import MainPage from './containers/MainPage';
import StatisticsPage from './containers/StatisticsPage';
import ComplicatePage from './containers/ComplicatePage';
import PlayButton from './components/PlayButton';
import Toggle from './components/Toggle';
import Sidenav from './components/Sidenav';
import saveData from './helpers/saveData';

import { actions } from './constants';
import { getState, dispatch, subscribe } from './store';

import './main.css';

class App extends Base {
  app = document.querySelector('.app');
  header;
  sidenav = new Sidenav();
  toggle = new Toggle();
  mainPage;
  categoryPage;
  statisticsPage;
  complicatePage;
  playButton = new PlayButton();

  path;

  renderCategory = () => {
    const { currentCategory, categories } = getState();
    document.title = categories.find(
      (cate) => cate.link === currentCategory,
    ).title;
    this.categoryPage = new CategoryPage();
    this.app.append(this.categoryPage.Page);
    this.app.append(this.categoryPage.stars.container);
  };
  renderMain = () => {
    document.title = 'Main Page';
    this.mainPage = new MainPage();
    this.app.append(this.mainPage.Page);
  };

  renderStatistics = () => {
    document.title = 'Statistic';
    this.statisticsPage = new StatisticsPage();
    this.app.append(
      this.statisticsPage.table,
      this.statisticsPage.buttonHolder,
    );
  };

  renderComplicate = () => {
    document.title = 'This words are complicate for my boi, keep working!';
    this.complicatePage = new ComplicatePage();
    this.app.append(this.complicatePage.Page);
  };

  router = ({
    target: {
      location: { hash },
    },
  }) => {
    dispatch({ type: actions.ABBONDED_GAME });
    this.app.innerHTML = '';
    this.playButton.checkAvailable();
    this.path = hash.substr(1);
    switch (this.path) {
      case '':
        this.renderMain();
        break;
      case 'statistics':
        this.renderStatistics();
        break;
      case 'complicate':
        this.renderComplicate();
        break;
      default:
        dispatch({
          type: actions.SET_CURRENT_CATEGORY,
          payload: hash.split('/').pop(),
        });
        this.renderCategory();
        break;
    }
  };

  constructor() {
    super();

    this.header = this.createElement(
      'header',
      { class: 'header' },
      {},
      this.sidenav.button,
      this.toggle.toggle,
    );
    document.body.prepend(this.header, this.sidenav.sidenav);
    this.router({ target: window });
    window.addEventListener('hashchange', this.router);
    subscribe(() => {
      this.playButton.checkAvailable();
      saveData();
    });
  }
}

export default App;
