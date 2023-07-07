class FormValidator {
  constructor(classObj) {
    this._classObj = classObj;
  }

  _getErrorElement (input) {
    return this._form.querySelector(`#${input.id}-error`);
  }
  
  _showInputError (input, classObj) {
    const errorElement = getErrorElement(input);
    input.classList.add(classObj.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  };
  
  _hideInputError(input, classObj) {
    const errorElement = getErrorElement(input);
    input.classList.remove(classObj.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      showInputError(input, this._classObj);
    } else {
      hideInputError(input, this._classObj);
    }
  }

  _getInputList(form) {
    let inputList = Array.from(form.querySelectorAll(this._classObj.inputSelector));
    return inputList;
  }

  _InputListValidation(inputList, buttonElement) {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input, this._classObj);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (_hasInvalidInput(inputList)) {
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
    const formList = Array.from(document.querySelector(this._classObj.formSelector));
    formList.forEach((form) => {
      const inputList = Array.from(form._getInputList);
      const buttonElement = form.querySelector(this._classObj.submitButtonSelector);
      this._InputListValidation(inputList, buttonElement);
    });
    
  }
}


const classObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formValidation = new FormValidator(classObj);
formValidation.EnableFormValidation();