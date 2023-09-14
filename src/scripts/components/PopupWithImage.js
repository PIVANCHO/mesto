import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector);
    this._signature = this._popup.querySelector('.popup__signature');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._signature.textContent = name;
    super.open();
  }
}