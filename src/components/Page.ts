import {Component} from './base/Component';
import {ensureElement} from '../utils/utils';
import {IEvents} from './base/events';

// Интерфейс главной страницы
interface IPage {
  amountProducts: number;
  listProducts: HTMLElement[];
  lockPage: boolean;
}

// Класс корзины с товарами
export class Page extends Component<IPage> {
  protected _amount: HTMLElement;
  protected _listProducts: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);
    this._amount = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this._listProducts = ensureElement<HTMLElement>('.gallery', this.container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container);
    this._basket = ensureElement<HTMLElement>('.header__basket', this.container);
    
    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  // Устанавливает список товаров в ларьке
  set listProducts (products: HTMLElement[]) {
    this._listProducts.replaceChildren(...products);
  }

  // Устанавливает количество товаров добавленых в корзину
  set amountProducts (total: number) {
    this.setText(this._amount, String(total));
  }

  // Устанавливает состояние страници на заблокировано/разблокировано
  set lockPage (state: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', state);
  }
}