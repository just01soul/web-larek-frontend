import {IFormContact} from "../types/index";
import {ensureElement} from "../utils/utils";
import {IEvents} from "./base/events";
import {FormOrder} from "./FormOrder";

// Класс контактных данных покупателя
export class FormContact extends FormOrder<IFormContact> {
  protected _email: HTMLInputElement;
  protected _numberPhone: HTMLInputElement;

  constructor (container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this._email = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
    this._numberPhone = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);
  }

  // Устанавливает электронную почту покупателя
  set email(value: string) {
    this.setText(this._email, value);
  }

  // Устанавливает номер телефона покупателя
  set phone(value: string) {
    this.setText(this._numberPhone, value);
  }
}