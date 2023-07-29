import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector);
    this._signature = this._popup.querySelector('.popup__signature');
    this._image = this._popup.querySelector('.popup__image');
  }

  setEventListeners() {
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._buttonClose.addEventListener('click', () => {
      super.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        super.close();
      }
    });
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._signature.textContent = name;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
}