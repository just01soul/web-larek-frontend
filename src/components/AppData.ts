import {IProduct, IBasket, IOrder, ValidationErrors, MethodPay} from "../types/index";
import {IEvents} from "./base/events";


// Класс корзины с товарами
export class AppData {
  listProducts: IProduct[] = [];
  preview: string| null = null;
  basket: IBasket = {
		items: [],
		total: 0,
	};
  order: IOrder = {
		address: '',
		payment: '',
    email: '',
		phone: '',
	};
  formErrors: ValidationErrors = {};

  constructor (protected events: IEvents) {}

  // Устанавливает список товаров в ларьке
  setProducts (products: IProduct[]) { 
    this.listProducts = products;
    this.events.emit('products:change', {listProducts: this.listProducts});
  }

  // Устанавливает предпросмотр выбранного продукта
  setPreview (product: IProduct) {
    this.preview = product.id;
		this.events.emit('preview:change', product);
  }

  // Добавляет выбранный продукт в корзину
  addToBasket (product: IProduct) {
    this.basket.items.push(product.id);
    this.basket.total += product.price;
		this.events.emit('basket:change');
  }

  // Удаляет выбранный продукт в корзину
  deleteFromBasket (product: IProduct) {
    this.basket.items = this.basket.items.filter((id) => id !== product.id);
    this.basket.total -= product.price;
		this.events.emit('basket:change');
  }

  // Проверяет наличие выбранного товара в корзине
  isInBasket (product: IProduct) {
    return this.basket.items.includes(product.id);
  }

  // Устанавливает переданный метод оплаты
  setMethodPay (method: MethodPay) {
    this.order.payment = method;
    this.validOrder();
  }

  // Устанавливает в указанном поле формы переданное значение
  setOrderField (field: keyof IOrder, value: string) {
    if (field === 'payment') {
			this.setMethodPay (value as MethodPay);
		} else {
			this.order[field] = value;
		}
		this.validOrder();
  }

  // Проводит валидацию заполнения полей формы заказа
  validOrder(): boolean {
    const errors: ValidationErrors = {};

    if (!this.order.payment) {
      errors.payment = 'Выберите способ оплаты';
    }

    if (!this.order.address) {
      errors.address = 'Укажите адрес';
    }

    if (!this.order.email) {
      errors.email = 'Укажите электронную почту';
    } else if (!this.order.email.includes('@')) {
      errors.email = 'Некорректный ввод электронной почты';
    }

    if (!this.order.phone) {
      errors.phone = 'Укажите номер телефона';
    } else if (!/^\+?\d+$/.test(this.order.phone)) {
      errors.phone = 'Неверно указан номер телефона';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  // Очищает корзину от товаров
  clearBasket() {
    this.basket.items = [];
    this.basket.total = 0;
		this.events.emit('basket:change', this.basket);
  }
  
  // Очищает поля формы заказа от всех значений
  clearFormOrder() {
    this.order = {
      address: '',
      payment: '',
      email: '',
      phone: '',
	  };
		this.events.emit('order:change');
  }
}