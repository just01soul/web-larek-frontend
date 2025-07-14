import {Component} from './base/Component';
import {ISuccessOrder} from '../types/index';
import {ensureElement} from '../utils/utils';
import {IEvents} from './base/events';

// Класс cподтверждения успешного заказа продуктов
export class SuccessOrder extends Component<ISuccessOrder> {
  protected _amount: HTMLElement;
  protected _close: HTMLElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);
    this._amount = ensureElement<HTMLElement>('.order-success__description', this.container);
    this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

    this._close.addEventListener('click', () => {
			this.events.emit('order:finished');
		});
  }

  // Устанавливает сумму успешного заказа
  set totalOrder(total: number) {
    this.setText(this._amount, `Списано ${total} синапсов`);
  }
}