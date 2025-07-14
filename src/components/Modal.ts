import {Component} from './base/Component';
import {ensureElement} from '../utils/utils';
import {IEvents} from './base/events';

interface IModal {
  content: HTMLElement;
}

// Класс модального окна
export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);
    this._content = ensureElement<HTMLElement>('.modal__content', this.container);
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    
    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  // Устанавливает контент для модалього окна
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  // Открывает модальное окно
  open(): void {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
    document.body.style.overflow = 'hidden';
  }

  // Cкрывает модальное окно
  close(): void {
    this.container.classList.remove('modal_active');
    this._content.replaceChildren();
    this.events.emit('modal:close');
    document.body.style.overflow = '';
    
  }

  // Создает и открывает модальное окно по переданным данным
  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}