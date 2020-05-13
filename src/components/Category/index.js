import Base from '../../helpers/baseClass';
import { getRandomColor } from '../../helpers/selectColor';

import './category.css';

class Category extends Base {
  holder;
  category;
  mask;
  content;
  header;

  constructor({ image, title, link }) {
    super();

    this.header = this.createElement(
      'h3',
      { class: 'category__title' },
      {},
      title,
    );

    this.content = this.createElement(
      'div',
      { class: 'category__content' },
      {},
      this.header,
    );
    this.mask = this.createElement(
      'div',
      {
        class: 'category__mask',
        style: `border-color: rgba(${getRandomColor()}, 0.3);`,
      },
      {},
      this.content,
    );

    this.holder = this.createElement(
      'div',
      {
        class: 'category',
        style: `background-image: url(./${image});`,
      },
      {},
      this.mask,
    );

    this.category = this.createElement(
      'a',
      { class: 'clickable-category', href: `#category/${link}` },
      {},
      this.holder,
    );

    return this;
  }
}

export default Category;
