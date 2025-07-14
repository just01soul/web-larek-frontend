import {IFormAddress, MethodPay} from "../types/index";
import {ensureElement} from "../utils/utils";
import {IEvents} from "./base/events";
import {FormOrder} from "./FormOrder";

// Класс оплаты и адреса доставки заказа
export class FormAddress extends FormOrder<IFormAddress> {
  protected _paymentContainer: HTMLDivElement;
  protected _paymentButtons: HTMLButtonElement[];
  protected _address: HTMLInputElement;

  constructor (container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this._paymentContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
    this._paymentButtons = Array.from(this._paymentContainer.querySelectorAll('.button_alt'));
    this._address = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);

    this._paymentContainer.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      if (!target.classList.contains('button_alt')) return;
      this.selectPayment = target.name as MethodPay;
      events.emit(`order-payment:change`, {target: target.name}) ;
    });
  }

  // Устанавливает способ оплаты заказа
  set selectPayment (metodPay: MethodPay) {
    this._paymentButtons.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === metodPay);
    });
  }

  // Устанавливает адрес доставки товара
  set address(value: string) {
    this.setText(this._address, value);
  }
}