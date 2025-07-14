# Проектная работа "Веб-ларек"

Удобный интернет-магазин с товарами для веб-разработчиков!

---

## Используемый стек, структура проекта и важные файлы

<details>
  <summary>Cтек</summary>
  <ul>
    <li>HTML</li>
    <li>SCSS</li>
    <li>TS</li>
    <li>Webpack</li>
  </ul>
</details>
<details>
  <summary>Структура проекта</summary>
  <ul>
    <li>src/ — исходные файлы проекта</li>
    <li>src/components/ — папка с JS компонентами</li>
    <li>src/components/base/ — папка с базовым кодом</li>
  </ul>
</details>
<details>
  <summary>Важные файлы</summary>
  <ul>
    <li>src/pages/index.html — HTML-файл главной страницы</li>
    <li>src/types/index.ts — файл с типами</li>
    <li>src/index.ts — точка входа приложения</li>
    <li>src/scss/styles.scss — корневой файл стилей</li>
    <li>src/utils/constants.ts — файл с константами</li>
    <li>src/utils/utils.ts — файл с утилитами</li>
  </ul>
</details>

---

## Инструкция по сборке и запуску

<details>
  <summary>Установка и запуск</summary>
  Для установки и запуска проекта необходимо выполнить команды
    
    npm install
    npm run start

или

    yarn
    yarn start

</details>

<details>
  <summary>Сборка</summary>
    
    npm run build

или

    yarn build

</details>

---

## Документация

В проекте применяется MVP Архитектура (Model-View-Presenter). А также событийно-ориентированный подход, основанный на реакциях происходящих в системе изменениий.

<details>
  <summary>Типы данных</summary>
  <ul>
    <li>Тип <code>CategoryProduct = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое'</code>.
      <p>Описывает категории товаров.</p>
    </li>
    <li>Тип <code>MethodPay = 'cash' | 'card' | ''</code>.
      <p>Описывает способы оплаты.</p>
    </li>
    <li>Тип <code>FormError = Partial&ltRecord&ltkeyof IOrder, string&gt&gt</code>.
      <p>Описывает ошибки валидации форм.</p>
    </li>
    <li>Интерфейс <code>IProduct</code>. 
      <p>Отображает возвращаемые данные карточки.</p>
      <p>Имеет следующие свойства:
        <ul>
          <li><code>id: string</code> - id товара.</li>
          <li><code>category?: CategoryProduct</code> - категория товара.</li>
          <li><code>title: string</code> - название товара.</li>
          <li><code>image?: string</code> - ссылка на изображение.</li>
          <li><code>description?: string</code> - описание товара.</li>
          <li><code>price: number | null</code> - цена товара, которая может быть null.</li>
        </ul>
      </p>
    </li>
    <li>Интерфейс <code>IBasket</code>. 
      <p>Отображает количество товаров и итоговую сумму в корзине.</p>
      <p>Имеет следующие свойства:
        <ul>
          <li><code>products: string[]</code> - количество товаров в корзине.</li>
          <li><code>total: number</code> - сумма заказа.</li>
        </ul>
      </p>
    </li>
    <li>Интерфейс <code>IFormAddress</code>. 
      <p>Отображает способ оплаты и адрес доставки.</p>
      <p>Имеет следующие свойства:
        <ul>
          <li><code>payment: MethodPay</code> - способ оплаты товара.</li>
          <li><code>address: string</code> - адрес доставки.</li>
        </ul>
      </p>
    </li>
    <li>Интерфейс <code>IFormContact</code>. 
      <p>Отображает адрес элекронной почты и номер телефона для связи.</p>
      <p>Имеет следующие свойства:
        <ul>
          <li><code>email: string</code> - адрес электронной почты.</li>
          <li><code>phone: string</code> - номер телефона для связи.</li>
        </ul>
      </p>
    </li>
    <li>Интерфейс <code>IOrder</code>. 
      <p>Объединяет интерфейсы <code>IFormAddress</code> и <code>IFormContact</code> и наследует их свойства.</p>
    </li>
    <li>Интерфейс <code>ISuccessOrder</code>. 
      <p>Отображает успешный заказ товаров.</p>
      <p>Имеет следующие свойства:
        <ul>
          <li><code>id: string</code> - id заказа.</li>
          <li><code>total: number</code> - сумма заказа.</li>
        </ul>
      </p>
    </li>
  </ul>
</details>

<details>
  <summary>Слой Model (Модель)</summary>
  <ul>
   <li>Базовый класс <code>Api</code>
      <p>Обеспечивает обмен данными с сервером. В конструктор входит два аргумента: <code>baseUrl: string</code> - базовый URL и <code>options: RequestInit</code> - объект с запросами. По умолчанию <code>option</code> задается пустым объектом.</p>
      <p>Имеет следующие методы:
        <ul>
          <li><code>handleResponse</code> - защищенный метод, обрабатывающий ответ от сервера.</li>
          <li><code>get</code> - запрашивает данные от сервера.</li>
          <li><code>post</code> - передаёт данные на сервер.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>ApiWebLarek</code>
      <p>Расширяет класс Api для работы с конкретным сервером. В конструктор входит три аргумента: <code>cdn: string</code> - URL с контентом, <code>baseUrl: string</code> - базовый URL и <code>options?: RequestInit</code> - опциональные настройки запроса.
      <p>Имеет следующие методы:
        <ul>
          <li><code>getListProducts</code> - получение списка продуктов с сервера.</li>
          <li><code>getProduct</code> - получение продукта с сервера по запросу id.</li>
          <li><code>createOrder</code> - передача успешного заказа на сервер и возвращение результата.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>AppData</code>
      Хранит данные и логику работы с ними. В конструктор входит один аргумент: <code>events: IEvents</code> - обработчик событий.</p>
      <p>Имеет следующие методы:
        <ul>
          <li><code>setProducts</code> - устанавливает список товаров.</li>
          <li><code>setPreview</code> - устанавливает предпросмотр выбранного продукта.</li>
          <li><code>addToBasket</code> - добавляет выбранный продукт в корзину.</li>
          <li><code>deleteFromBasket</code> - удаляет выбранный продукт из корзины.</li>
          <li><code>isInBasket</code> - проверяет наличие выбранного товара в корзине.</li>
          <li><code>setMethodPay</code> - устанавливает переданный метод оплаты.</li>
          <li><code>setOrderField</code> - устанавливает в указанном поле формы переданное значение.</li>
          <li><code>validOrder</code> - проводит валидацию заполнения полей формы заказа.</li>
          <li><code>clearBasket</code> - очищает корзину от товаров.</li>
          <li><code>clearFormOrder</code> - очищает поля формы заказа от всех значений.</li>
        </ul>
      </p>
    </li>
  </ul>
</details>

<details>
  <summary>Слой Presenter (Презентер)</summary>
  <ul>
   <li>Бaзовый класс <code>EventEmitter</code>
      <p>Реализует интерфейс <code>IEvents</code> и выступает в роли "Наблюдателя", позволяя уведомлять о событиях подписываться и отписываться на определенное событие или на все сразу.</p>
      <p>Имеет следующие методы:
        <ul>
          <li><code>on</code> - подписаться на событие.</li>
          <li><code>off</code> -отписаться от события.</li>
          <li><code>emit</code> - уведомление о событии.</li>
          <li><code>onAll</code> - подписаться на все события.</li>
          <li><code>offAll</code> - отписаться от всех событий.</li>
        </ul>
      </p>
    </li>
    <li>
      <p>
        Презентер в данном проекте не выделен в отдельный класс, а прописан в осномном файле <code>src/index.ts</code>. В нем описаны реакции, возникающие при определенных событиях в коде.
      </p>
      <p>Реакции на события:
        <ul>
          <li><code>products:change</code> - изменение списка продуктов.</li>
          <li><code>preview:change</code> - изменение выбора открываемого продукта.</li>
          <li><code>card:select</code> - выбор карточки.</li>
          <li><code>modal:open/:close</code> - открытие/закрытие модального окна.</li>
          <li><code>basket:open</code> - открытие корзины.</li>
          <li><code>basket:change</code> - изменение количества продуктов в корзине.</li>
          <li><code>order:open</code> - открытие окна с оформлением заказа.</li>
          <li><code>order-payment:change</code> - изменение способа оплаты заказа.</li>
          <li><code>order-address:change</code> - изменение адреса в форме заказа.</li>
          <li><code>contacts-email:change</code> - изменение почты в форме заказа.</li>
          <li><code>contacts-phone:change</code> - изменение номера телефона в форме заказа.</li>
          <li><code>formErrors:change</code> - изменение видов ошибок в валидации формы заказа.</li>
          <li><code>order:submit</code> - отправки формы с методом оплаты и адресом доставки.</li>
          <li><code>contacts:submit</code> - отправки формы с контактными данными покупателя.</li>
          <li><code>order:finished</code> - завершение окна с успешным оформлением заказа.</li>
        </ul>
      </p>
    </li>
  </ul>
</details>

<details>
  <summary>Слой View (Представление)</summary>
  <ul>
   <li>Базовый абстрактный класс <code>Component&ltT&gt</code>
      <p>Отображает элементы пользовательского интерфейса. Конструктор состоит из одного, доступного только для чтения, защищенного аргумента: <code>container: HTMLElement</code> -  контейнер с помещаемым элементом.</p>
      <p>Имеет следующие методы:
        <ul>
          <li><code>toggleClass</code> - переключает класс элемента.</li>
          <li><code>setText</code> - задает текст элементу.</li>
          <li><code>setDisable</code> - блокирует элемент.</li>
          <li><code>setVisible/setHidden</code> - отоброжает и скрывает элемент.</li>
          <li><code>setImage</code> - устанавливает картинку для элемента.</li>
          <li><code>render</code> - создает готовый элемент страницы по полученым данным.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Product</code>
      <p>Расширяет абстрактный класс <code>Component&ltT&gt</code> и реализует интерфейс <code>IProduct</code>. Данный класс содержит всю информацию о карточке товара. Конструктор состоит из одного наследуемого аргумента: <code>container: HTMLElement</code>, и дополнительного опционального аргумента <code>action?: IProductAction</code> - действие, выполняемое при нажатии кнопки карточки товара.</p>
      <p>Имеет следующие методы - сеттеры:
        <ul>
          <li><code>id</code> - устанавливает id для карточки продукта.</li>
          <li><code>category</code> - устанавливает категорию для карточки продукта.</li>
          <li><code>title</code> - устанавливает название для карточки продукта..</li>
          <li><code>image</code> - устанавливает изображение для карточки продукта..</li>
          <li><code>description</code> - устанавливает описание для карточки продукта.</li>
          <li><code>price</code> - устанавливает цену для карточки продукта.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Basket</code>
      <p>Расширяет абстрактный класс <code>Component&ltT&gt</code> и реализует интерфейс <code>IBasket</code>. Данный класс содержит всю информацию о корзине покупок: количество продуктов, итоговая стоимость. Конструктор состоит из одного наследуемого аргумента: <code>container: HTMLElement</code>, и дополнительного опционального аргумента <code>events: IEvents</code> - обработчик событий.</p>
      <p>Имеет следующий метод:
        <ul>
          <li><code>statusButton</code> - задает состояние кнопки.</li>
        </ul>
      </p>
      <p>Имеет следующие методы - сеттеры:
        <ul>
          <li><code>items</code> - устанавливает список продуктов в корзине.</li>
          <li><code>total</code> - устанавливает итоговую стоимость продуктов в корзине.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Modal</code>
      <p>Расширяет абстрактный класс <code>Component&ltT&gt</code>. Открывает и скрывает модальное окно с переданным туда контентом. Конструктор состоит из одного наследуемого аргумента: <code>container: HTMLElement</code>, и дополнительного опционального аргумента <code>events: IEvents</code> - обработчик событий.</p>
      <p>Имеет следующие методы:
        <ul>
          <li><code>open</code> - открывает модальное окно.</li>
          <li><code>close</code> - скрывает модальное окно.</li>
          <li><code>render</code> - создает и открывает модальное окно по переданным данным.</li>
        </ul>
      </p>
      <p>Имеет следующий метод - сеттер:
        <ul>
          <li><code>content</code> - устанавливает контент для модалього окна.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>Page</code>
      <p>Расширяет абстрактный класс <code>Component&ltT&gt</code>. Отображает главную страницу со списком продуктов (карточек товаров). Конструктор состоит из одного наследуемого аргумента: <code>container: HTMLElement</code>, и дополнительного опционального аргумента <code>events: IEvents</code> - обработчик событий.</p>
      <p>Имеет следующие методы - сеттеры:
        <ul>
          <li><code>listProducts</code> - устанавливает список товаров в ларьке.</li>
          <li><code>amountProducts</code> - устанавливает количество товаров добавленых в корзину.</li>
          <li><code>lockPage</code> - устанавливает состояние страници на заблокировано/разблокировано.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>SuccessOrder</code>
      <p>Расширяет абстрактный класс <code>Component&ltT&gt</code> и реализует интерфейс <code>ISuccessOrder</code>. Отображает модальное окно с подтверждением успешного заказа продуктов. Конструктор состоит из одного наследуемого аргумента: <code>container: HTMLElement</code>, и дополнительного опционального аргумента <code>events: IEvents</code> - обработчик событий.</p>
      <p>Имеет следующий метод - сеттер:
        <ul>
          <li><code>totalOrder</code> - устанавливает сумму успешного заказа.</li>
        </ul>
      </p>
    </li>
    <li>Абстрактный класс <code>FormOrder&ltT&gt</code>
      <p>Расширяет абстрактный класс <code>Component&ltT&gt</code>. Обеспечивает взаимодействие с формой для оформления заказа. Конструктор состоит из одного наследуемого аргумента: <code>container: HTMLFormElement</code>, и дополнительного опционального аргумента <code>events: IEvents</code> - обработчик событий.</p>
      <p>Имеет следующие методы - сеттеры:
        <ul>
          <li><code>validForm</code> - устанавливает состояние кнопки отправки формы на  заблокировано/разлокировано.</li>
          <li><code>errorForm</code> - устанавливает сообщение о допущенной ошибке в заполнении формы заказа.</li>
        </ul>
      </p>
      <p>Имеет следующие методы:
        <ul>
          <li><code>onInputChange</code> - обрабатывет происходящие изменения в полях формы заказа при её заполнении.</li>
          <li><code>render</code> - отображает форму заказа на основе полученных данных.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>FormAddress</code>
      <p>Расширяет абстрактный класс <code>FormOrder&ltT&gt</code> и реализует интерфейс <code>IFormAddress</code>. Отображает форму заказа с выбором метода оплаты и полем для указания адреса доставки. Конструктор состоит из двух наследуемых аргументов: <code>container: HTMLFormElement</code>, и <code>events: IEvents</code>.</p>
      <p>Имеет следующие методы - сеттеры:
        <ul>
          <li><code>selectPayment</code> - устанавливает способ оплаты заказа.</li>
          <li><code>address</code> - устанавливает адрес доставки товара.</li>
        </ul>
      </p>
    </li>
    <li>Класс <code>FormContact</code>
      <p>Расширяет абстрактный класс <code>FormOrder&ltT&gt</code> и реализует интерфейс <code>IFormContact</code>. Отображает форму заказа с полями для указания электронной почты и номера телефона покупателя. Конструктор состоит из двух наследуемых аргументов: <code>container: HTMLFormElement</code>, и <code>events: IEvents</code>.</p>
      <p>Имеет следующие методы - сеттеры:
        <ul>
          <li><code>email</code> - устанавливает электронную почту покупателя.</li>
          <li><code>phone</code> - устанавливает  номер телефона покупателя.</li>
        </ul>
      </p>
    </li>
  </ul>
</details>