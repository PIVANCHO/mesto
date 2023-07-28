import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, buttonOpenSelector, submit}) {
    super({popupSelector, buttonOpenSelector});
    this._popup = document.querySelector(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValuesList = [];
    this._inputList.forEach((input) => {
      inputValuesList.push(input.value);
    });

    return inputValuesList;
  }

  setInputValues(inputValues) {
    this._inputList.forEach((input, i) => {
      input.value = inputValues[i];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
      this.close();
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._form.reset();
  }
}