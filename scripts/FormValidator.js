class FormValidator {
  constructor(form) {
    this._form = form;
  }

  _getErrorElement (input) {
    return this._form.querySelector(`#${input.id}-error`);
  }
  
  _showInputError (input) {
    const errorElement = this._getErrorElement(input);
    input.classList.add('.popup__input_type_error');
    errorElement.textContent = input.validationMessage;
  };
  
  _hideInputError(input) {
    const errorElement = this._getErrorElement(input);
    input.classList.remove('.popup__input_type_error');
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
    let inputList = Array.from(form.querySelectorAll('.popup__input'));
    return inputList;
  }

  _InputListValidation(inputList, buttonElement) {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      console.log('Я выключила кнопку');
    } else {
      buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  EnableFormValidation() {
    const inputList = Array.from(this._getInputList(this._form));
    const buttonElement = this._form.querySelector('.popup__save-button');
    this._InputListValidation(inputList, buttonElement);
  }
}


export {FormValidator}