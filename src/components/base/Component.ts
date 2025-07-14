
// Базовый абстрактный класс, который наследуют остальные классы в слои View

export abstract class Component<T> {
  protected constructor (protected readonly container: HTMLElement) {}

  // Переключение классов элемента
  toggleClass(element: HTMLElement, nameElement: string, force?: boolean){
    element.classList.toggle(nameElement, force);
  } 
  
  // Устанавливает переданный текст
  protected setText(element: HTMLElement, text: string | number){
    if (element) {
      element.textContent = String(text);
    }
  }

  // Блокирует или разблокирует элемент
  setDisable(element: HTMLElement, state: boolean){
    if (element) {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  // Делает элемент видимым
  protected setVisible(element: HTMLElement){
    element.style.removeProperty('display');
  }

  // Делает элемент невидимым
  protected setHidden(element: HTMLElement){
    element.style.display = 'none';
  }

  // Устанавивает переданное изображение
  protected setImage(element: HTMLImageElement, urlImage: string, altText?: string){
    if (element) {
      element.src = urlImage;
      if (altText) {
        element.alt = altText;
      }
    }  
  }

  // Принимает переданные данные, обрабатывает и возращает итоговый элемент
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}