import {Component} from './base/Component';
import {IBasket} from '../types/index';
import {ensureElement, createElement} from '../utils/utils';
import {IEvents} from './base/events';

// Класс корзины с товарами
export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
	protected _total: HTMLElement;
  protected _button: HTMLElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('order:open');
      });
    }

    this.items = [];
  }

   // Задает состояние кнопки
  statusButton(state: boolean) {
		this.setDisable(this._button, state);
	}

  // Устанавливает товары в корзине
  set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.statusButton(false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.statusButton(true);
		}
	}

  // Устанавливает общую сумму товаров в корзине
	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}
}