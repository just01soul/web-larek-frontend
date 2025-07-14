import './scss/styles.scss';
import {ApiWebLarek} from './components/ApiWebLarek';
import {CDN_URL, API_URL} from './utils/constants';
import {EventEmitter} from './components/base/events';
import {AppData} from './components/AppData';
import {ensureElement, cloneTemplate} from './utils/utils';
import {Page} from './components/Page';
import {Modal} from './components/Modal';
import {Basket} from './components/Basket';
import {FormContact} from './components/FormContact';
import {FormAddress} from './components/FormAddress';
import {SuccessOrder} from './components/SuccessOrder';
import {Product} from './components/Product';
import {IOrder, IProduct, MethodPay} from './types/index';

// Создание экзепляра объекта для взаимодействия с сервером
const api = new ApiWebLarek(CDN_URL, API_URL);

// DOM элементы
const modalTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const formAddressTemplate = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successOrderTemplate = ensureElement<HTMLTemplateElement>('#success');
const listProductsTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// Создание экзепляра объекта "Наблюдателя"
const events = new EventEmitter();

// Создание экзепляр аобъекта для хранения данных
const appData = new AppData(events);

// Создание экзепляров объектов UI из DOM элементов
const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const formAddress = new FormAddress(cloneTemplate(formAddressTemplate), events);
const formContacts = new FormContact(cloneTemplate(formContactsTemplate), events);
const successOrder = new SuccessOrder(cloneTemplate(successOrderTemplate), events);

// Бизнес-логика проекта
// Получение списка товаров
api
	.getListProducts()
	.then((products) => {
		appData.setProducts(products);
	})
	.catch((error) => {
		console.error('Ошибка загрузки списка товаров:', error);
	});

// Изменение списка товаров
events.on('products:change', () => {
	page.listProducts = appData.listProducts.map((product) => {
		const card = new Product(cloneTemplate(listProductsTemplate), {
			onClick: () => events.emit('card:select', product),
		});
		return card.render(product);
	});
});

// Изменение превью товара
events.on('preview:change', (product: IProduct) => {
	const cardPreview = new Product(cloneTemplate(productPreviewTemplate), {
		onClick: () => {
			if (appData.isInBasket(product)) {
				appData.deleteFromBasket(product);
				cardPreview.button = 'Добавить в корзину';
			} else {
				appData.addToBasket(product);
				cardPreview.button = 'Удалить из корзины';
			}
		},
	});

	cardPreview.button = appData.isInBasket(product) ? 'Удалить из корзины' : 'Добавить в корзину';
	modal.render({content: cardPreview.render(product)});
});

// Отображение превью выбранной карточки
events.on('card:select', (product: IProduct) => {
	appData.setPreview(product);
});

// Изменение состояния страницы при открытии/закрытии модального окна
events.on('modal:open', () => {
	page.lockPage = true;
});

events.on('modal:close', () => {
	page.lockPage = false;
});

// Открытие корзины покупок
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// Изменение количества продуктов в корзине
events.on('basket:change',() => {
	page.amountProducts = appData.basket.items.length;
	basket.items = appData.basket.items.map((id) => {
		const item = appData.listProducts.find((product) => product.id === id);
		const cardBasket = new Product(cloneTemplate(productBasketTemplate), {
			onClick: () => appData.deleteFromBasket(item),
		});
		return cardBasket.render(item);
	});

	basket.total = appData.basket.total;
});

// Открытие окна с оформлением заказа
events.on('order:open', () => {
	appData.clearFormOrder();
	modal.render({
		content: formAddress.render({
			address: appData.order.address,
      payment: appData.order.payment,
      valid:  appData.validOrder(),
      errors: [],
		}),
	});
});

// Изменение видов ошибок в валидации формы заказа
events.on('formErrors:change', (errors: Partial<IOrder>) => {
	const {payment, address, email, phone} = errors;
	const createValidError = (
		errorsObject: Record<string, string>
	): string =>
		Object.values(errorsObject)
			.filter((i) => !!i)
			.join(' и ');

	formAddress.validForm = !payment && !address;
	formAddress.errorForm = createValidError({payment, address});
	formContacts.validForm = !email && !phone;
	formContacts.errorForm = createValidError({email, phone});
});


// Изменение способа оплаты заказа
events.on('order-payment:change', (data: {target: string}) => {
	appData.setOrderField('payment', data.target);
	}
);

// Изменение адреса в форме заказа
events.on('order-address:change', (data: {value: string}) => {
	appData.setOrderField('address', data.value);
});

// Изменение почты в форме заказа
events.on('contacts-email:change', (data: {value: string}) => {
	appData.setOrderField('email', data.value);
});

// Изменение номера телефона в форме заказа
events.on('contacts-phone:change', (data: {value: string}) => {
	appData.setOrderField('phone', data.value);
});

// Открытие окна с контактными данными
events.on('order:submit', () => {
	modal.render({
		content: formContacts.render({
			email: appData.order.email,
			phone: appData.order.phone,
			valid: appData.validOrder(),
			errors: [],
		}),
	});
});

// Отправка формы с контактными данными покупателя
events.on('contacts:submit', () => {
	api
		.createOrder({...appData.order, ...appData.basket})
		.then((data) => {
			modal.render({
				content: successOrder.render(),
			});
      successOrder.totalOrder = data.total;
			appData.clearBasket();
			appData.clearFormOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});


// Успешное завершение покупки товаров
events.on('order:finished', () => {
	modal.close();
});