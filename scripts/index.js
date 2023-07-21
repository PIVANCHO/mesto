import { FormValidator } from "./FormValidator.js";
import { initialCards, Card } from "./Card.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupFormEdit = document.querySelector('#form_profile-edit');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imageLinkInput = document.querySelector('.popup__input_type_image-link');
const popupFormAdd = document.querySelector('#popup__form_add');
const imagePopup = document.querySelector('#big-image');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupSignature = imagePopup.querySelector('.popup__signature');
const popupList = Array.from(document.querySelectorAll('.popup'));
const formList = Array.from(document.querySelectorAll('.popup__form'));


const validationSelectors = {
  errorInput: '.popup__input_type_error',
  input: '.popup__input',
  buttonSave: '.popup__save-button'
};

const cardSelectors = {
  template: '.card-template',
  element: '.element',
  likeActive: 'element__like_active',
  image: '.element__image',
  signature: '.element__signature',
  like: '.element__like',
  delete: '.element__delete'
};


function closeByEsc(evt) {             //Closing popup by Escape button
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

function closePopup(popup) {            //Close any popup
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openPopup(popup) {             //Open any popup
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function createCard(link, name) {          //Creating a card
  const card = new Card(link, name, cardSelectors);
  const cardElement = card.generateCard();
  return cardElement;
}

formList.forEach((form) => {                //Each form validation
  const formValidation = new FormValidator(form, validationSelectors);
  formValidation.enableFormValidation();
});

buttonsClose.forEach((item) => {            // Close opened popup by button
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

popupFormEdit.addEventListener('submit', (evt) => { //Edit form submititon
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
});

buttonEdit.addEventListener('click', () => {   //Open edit popup
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

buttonAdd.addEventListener('click', () => {    //Open card adding popup
  openPopup(popupAdd);
});

popupFormAdd.addEventListener('submit', (evt) => {   //Add form submititon
  evt.preventDefault();
  cardsContainer.prepend(createCard(imageLinkInput.value, cardNameInput.value, cardSelectors));
  popupFormAdd.reset();
  closePopup(popupAdd);
});

popupList.forEach((popup) => {           //Adding closing popup clicking outside listener 
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item.link, item.name));
});

export {imagePopup, imagePopupPicture, imagePopupSignature, openPopup}