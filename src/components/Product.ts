import {Component} from './base/Component';
import {IProduct} from '../types/index';
import {ensureElement} from '../utils/utils';
import {categories} from '../utils/constants';

// Типизация события клика
interface IProductAction {
  onClick: (event: MouseEvent) => void;
}

// Класс карточки товара
export class Product extends Component<IProduct> {
  protected _id: string;
  protected _category?: HTMLElement;
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _description?: HTMLElement;
  protected _price: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _index?: HTMLElement;

  constructor (container: HTMLElement, action?: IProductAction, index?: number) {
    super(container);
    
    this.container.dataset.id = this._id;
    this._category = container.querySelector('.card__category');
    this._title = ensureElement<HTMLElement>('.card__title', this.container);
    this._image = container.querySelector(`.card__image`);
    this._description = container.querySelector('.card__description');
    this._price = container.querySelector('.card__price');
    this._button = container.querySelector('.card__button');
    if (action?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', action.onClick);
      } else {
        this.container.addEventListener('click', action.onClick);
      }
    }

    this._index = container.querySelector('.basket__item-index');
    this.setText(this._index, index + 1);
  }
  
  // Устанавливает id для карточки продукта.
  set id (value: string){
    this.container.dataset.id = value;
  } 

  get id(): string {
		return this.container.dataset.id || '';
	}
  
  // устанавливает категорию для карточки продукта.
  set category(value: string) {
		this.setText(this._category, value);
		if (this._category) {
      Array.from(this._category.classList)
        .filter(className => className.startsWith("card__category_"))
        .forEach(className => this._category.classList.remove(className));
			this._category.classList.add(`card__category_${categories.get(value) ? categories.get(value) : 'other'}`);
		}
	}

  get category(): string {
		return this._category?.textContent || '';
	}

  // Устанавливает заголовок для карточки продукта.
  set title (value: string){
    this.setText(this._title, value);
  } 

  get title(): string {
		return this._title.textContent || '';
	}

  // Устанавливает картинку для карточки продукта.
  set image (value: string){
    this.setImage(this._image, value, this.title);
  }

  // Устанавливает описание продукта.
  set description (value: string){
    this.setText(this._description, value);
  } 

  get description(): string {
		return this._description.textContent || '';
	}

  // Устанавливает цену продукта.
  set price (value: string | null){
    this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
		if (this._button) {
			this._button.disabled = !value;
		};
  } 

  get price(): string {
		return this._price.textContent || '';
	}

  // Устанавливает название кнопки.
  set button(value: string) {
		this.setText(this._button, value);
	}
}