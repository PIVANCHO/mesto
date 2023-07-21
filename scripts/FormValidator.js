class FormValidator {
  constructor(form, selectors) {
    this._form = form;
    this._selectors = selectors;
  }

  _getErrorElement (input) {
    return this._form.querySelector(`#${input.id}-error`);
  }
  
  _showInputError (input) {
    const errorElement = this._getErrorElement(input);
    input.classList.add(this._selectors.errorInput);
    errorElement.textContent = input.validationMessage;
  };
  
  _hideInputError(input) {
    const errorElement = this._getErrorElement(input);
    input.classList.remove(this._selectors.errorInput);
    errorElement.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _getInputList(form) {
    const inputList = Array.from(form.querySelectorAll(this._selectors.input));
    return inputList;
  }

  _inputListValidation(inputList, buttonElement) {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, buttonElement);
      });
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      // console.log('Я выключила кнопку');
    } else {
      buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableFormValidation() {
    this._inputList = Array.from(this._getInputList(this._form));
    this._buttonElement = this._form.querySelector(this._selectors.buttonSave);
    this._inputListValidation(this._inputList, this._buttonElement);
  }
}


export {FormValidator}