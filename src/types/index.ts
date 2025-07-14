export type CategoryProduct = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';
export type MethodPay = 'cash' | 'card' | '';
export type ValidationErrors = Partial<Record<keyof IOrder, string>>

export interface IProduct {
	id: string;
  category?: CategoryProduct;
  title: string;
  image?: string;
	description?: string;
	price: number | null;
}

export interface IBasket {
	items: string[];
	total: number;
}

export interface IFormAddress {
	payment: MethodPay;
  address: string;
}

export interface IFormContact {
	email: string;
  phone: string;
}

export interface IOrder extends IFormAddress, IFormContact{}

export interface ISuccessOrder {
	id: string;
	total: number;
}