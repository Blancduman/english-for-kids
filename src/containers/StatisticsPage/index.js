import Base from '../../helpers/baseClass';
import { getState } from '../../store';
import './statistics.css';

export default class Statistics extends Base {
  table;
  reset;
  hard;
  buttonHolder;

  sortTable = (column, way) => {
    const table = document.querySelector('.statistics');
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i += 1) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[column];
        y = rows[i + 1].getElementsByTagName('TD')[column];
        if (
          x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() && way === 'asc'
        ) {
          shouldSwitch = true;
          break;
        } else if (
          x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() && way === 'desc'
        ) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  };

  renderHeaders = () => {
    function rotation() {
      let way = 'desc';

      return () => {
        if (way === 'desc') way = 'asc';
        else way = 'desc';

        return way;
      };
    }

    const headers = [
      'Word',
      'Translation',
      'Clicks',
      'Guessed',
      'Mistakes',
      '%',
    ].map((head, i) => {
      const by = rotation();
      return this.createElement(
        'th',
        {},
        {
          click: () => {
            this.sortTable(i, by());
          },
        },
        head,
      );
    });

    return this.createElement('tr', {}, {}, ...headers);
  };

  constructor() {
    super();

    let lines = [];
    const { statistics, categories } = getState();

    categories.forEach(({ title }) => {
      statistics[title].forEach(
        ({
          word,
          translation,
          trainMode: { amountClicks },
          gameMode: { guessed, mistakes, attempts },
        }) => {
          if (attempts !== 0) {
            const row = [
              word,
              translation,
              amountClicks,
              guessed,
              mistakes,
              `${Math.round((mistakes / attempts).toFixed(2) * 100)}%`,
            ].map((column) => this.createElement('td', {}, {}, `${column || 0}`));

            const tr = this.createElement('tr', {}, {}, ...row);

            lines = [...lines, tr];
          }
        },
      );
    });

    this.table = this.createElement(
      'table',
      { class: 'statistics' },
      {},
      this.renderHeaders(),
      ...lines,
    );

    this.reset = this.createElement(
      'button',
      { class: 'statistic-button' },
      {
        click: () => {
          localStorage.clear();
          window.location.replace(window.location.origin);
        },
      },
      'Reset',
    );
    this.hard = this.createElement(
      'button',
      { class: 'statistic-button' },
      {
        click: () => {
          this.createElement('a', { href: '/#complicate' }).click();
        },
      },
      'Repeat difficult words',
    );
    this.buttonHolder = this.createElement(
      'div',
      { class: 'button-container' },
      {},
      this.reset,
      this.hard,
    );

    return this;
  }
}
