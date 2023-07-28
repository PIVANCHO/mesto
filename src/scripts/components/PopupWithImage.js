import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {nameImage, sourceImage}) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector);
    this._sourceImage = sourceImage;
    this._nameImage = nameImage;
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

  open() {
    this._image.src = this._sourceImage;
    this._image.alt = this._nameImage;
    this._signature.textContent = this._nameImage;
    this._popup.classList.add('popup_opened');
  }
}