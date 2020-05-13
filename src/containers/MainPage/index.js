import Base from '../../helpers/baseClass';
import Category from '../../components/Category';
import { getState } from '../../store';

export default class MainPage extends Base {
  categoryList;
  Page;

  constructor() {
    super();

    this.categoryList = getState().categories.map(
      (category) => new Category(category),
    );

    this.Page = this.createElement(
      'main',
      { class: 'main' },
      {},
      ...this.categoryList.map((categoryItem) => categoryItem.category),
    );

    return this;
  }
}
