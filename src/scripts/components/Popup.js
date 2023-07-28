export default class Popup {
  constructor({popupSelector, buttonOpenSelector}) {
    this._popup = document.querySelector(popupSelector);
    this._buttonOpen = document.querySelector(buttonOpenSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this._buttonOpen.addEventListener('click', () => {
      this.open();
      console.log('opened');
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._handleEscClose(evt);
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}