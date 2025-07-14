import {IProduct, IOrder, ISuccessOrder} from "../types";
import {Api, ApiListResponse} from "./base/api";


export interface IApiWebLarek  {
    getListProducts: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct>;
    createOrder: (order: IOrder) => Promise<ISuccessOrder>;
}

// Класс для работы с конкретным сервером
export class ApiWebLarek extends Api implements IApiWebLarek {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);

    this.cdn = cdn;
  }

   // Получение списка продуктов с сервера
  getListProducts(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
        data.items.map((item) => ({...item, image: this.cdn + item.image,}))
      );
  }

  // Получение продукта с сервера по запросу id
  getProduct(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`)
      .then(
        (item: IProduct) => ({
          ...item,
          image: this.cdn + item.image.replace('.svg', '.png')
        })
      );
  }

  // Передача успешного заказа на сервер и возвращение результата
  createOrder(order: IOrder): Promise<ISuccessOrder> {
    return this.post(`/order`, order).then((data: ISuccessOrder) => data)
  }
}