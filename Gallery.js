"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} settings.openedImageErrorBtnSrc Путь до заглушки не работающей картинки.
 * @property {string} settings.openedImageName имя картинки.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageScrollLeftBtnClass: 'galleryWrapper__scrollLeft',
    openedImageScrollRightBtnClass: 'galleryWrapper__scrollRight',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    openedImageErrorBtnSrc: 'images/gallery/error.jpg',
    openedImageRightSrc: 'images/gallery/right.png',
    openedImageLeftSrc: 'images/gallery/left.png',
    openedImageName: null,
  },

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }
    // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
    this.openImage(event.target.dataset.full_image_url);
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
      let el = this.getScreenContainer(src).querySelector(`.${this.settings.openedImageClass}`);
      el.src = src;
      el.onerror = () => {el.src = this.settings.openedImageErrorBtnSrc};


  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer(srcOld) {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer(srcOld);
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer(srcOld) {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку для левой стрелки, ставим класс, src и добавляем ее в контейнер-обертку.
    const LeftImageElement = new Image();
    LeftImageElement.classList.add(this.settings.openedImageScrollLeftBtnClass);
    LeftImageElement.src = this.settings.openedImageLeftSrc;
    LeftImageElement.addEventListener('click', (event) => this.scrollLeft(event,srcOld));
    galleryWrapperElement.appendChild(LeftImageElement);

    // Создаем картинку для правой стрелки, ставим класс, src и добавляем ее в контейнер-обертку.
    const rightImageElement = new Image();
    rightImageElement.classList.add(this.settings.openedImageScrollRightBtnClass);
    rightImageElement.src = this.settings.openedImageRightSrc;
    rightImageElement.addEventListener('click', (event) => this.scrollRight(event,srcOld));
    galleryWrapperElement.appendChild(rightImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },
  /**
   * Перелистывает картинки в лево
   */
  scrollLeft(event,src){
    for (const argument of document.querySelectorAll("img")) {
      if (argument.dataset.full_image_url === src){
        if (argument.previousElementSibling === null){
            src = argument.parentElement.lastElementChild.dataset.full_image_url;
            this.close();
            this.openImage(src);
            return ;
        } else {
            src = argument.previousElementSibling.dataset.full_image_url;
            this.close();
            this.openImage(src);
            return ;
        }        //this.openImage();
      }
    }
  },

  /**
   * Перелистывает картинки в право
   */
  scrollRight(event,src){
    for (const argument of document.querySelectorAll("img")) {
      if (argument.dataset.full_image_url === src){
        if (argument.nextElementSibling === null){
            src = argument.parentElement.firstElementChild.dataset.full_image_url;
            this.close();
            this.openImage(src);
            return ;
        } else {
            src = argument.nextElementSibling.dataset.full_image_url;
            this.close();
            this.openImage(src);
            return ;
        }
      }
    }
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});