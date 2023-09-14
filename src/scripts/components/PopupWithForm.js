import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submit}) {
    super({popupSelector});
    this._popup = document.querySelector(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });

    return inputValues;
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
      this._submit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}