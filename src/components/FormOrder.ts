import {Component} from './base/Component';
import {ensureElement} from '../utils/utils';
import {IEvents} from './base/events';

// Интерфейс, описываем состояние формы: валидность и ошибки
interface IFormOrder {
	valid: boolean;
	errors: string[];
}

// Класс формы заказа
export class FormOrder<T> extends Component<IFormOrder> {
  protected _errors: HTMLElement;
  protected _submit: HTMLButtonElement;

  constructor (protected container: HTMLFormElement, protected events: IEvents) {
    super(container);
    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

    this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});
    
    this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
  }

  // Устанавливает состояние кнопки отправки формы на заблокировано/разлокировано
  set validForm(state: boolean) {
    this.setDisable(this._submit, !state);
  }

  // Устанавливает сообщение о допущенной ошибке в заполнении формы заказа
  set errorForm(messages: string[] | string) {
    if (Array.isArray(messages)) {
      this.setText(this._errors, messages.join(', '));
    } else {
      this.setText(this._errors, messages);
    }
  }

  // Обрабатывет происходящие изменения в полях формы заказа при её заполнении.
  protected onInputChange(field: keyof T, value: string) {
    this.events.emit(`${this.container.name}-${String(field)}:change`, {field, value});
  }

  // Отображает форму заказа на основе полученных данных.
  render(state: Partial<T> & IFormOrder): HTMLElement {
    const {valid, errors, ...inputs} = state;
		super.render({valid, errors});
		Object.assign(this, inputs);
		return this.container;
  }
}