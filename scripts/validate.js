const classObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const getErrorElement = (input) => {
  return document.querySelector(`#${input.id}-error`);
}

const showInputError = (input, classObj) => {
  const errorElement = getErrorElement(input);
  input.classList.add(classObj.inputErrorClass);
  errorElement.textContent = input.validationMessage;
};

const hideInputError = (input, classObj) => {
  const errorElement = getErrorElement(input);
  input.classList.remove(classObj.inputErrorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (input, classObj) => {
  if (!input.validity.valid) {
    showInputError(input, classObj);
  } else {
    hideInputError(input, classObj);
  }
}

const toggleButtonState = (form, classObj) => {
  const buttonElement = form.querySelector(classObj.submitButtonSelector);
  const inputList = Array.from(form.querySelectorAll(classObj.inputSelector));
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const enableValidation = (classObj) => {
  const formList = Array.from(document.querySelectorAll(classObj.formSelector));
  formList.forEach((form) => {
    toggleButtonState(form, classObj);
    form.addEventListener('input', () => {
      const inputList = Array.from(form.querySelectorAll(classObj.inputSelector));
      inputList.forEach((input) => {
        checkInputValidity(input, classObj);
        toggleButtonState(form, classObj);
      });
    });
  });
}

enableValidation(classObj);