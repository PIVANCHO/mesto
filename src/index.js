import imageButtonAddBig from './images/add-button_big.svg';
import imageButtonAdd from './images/add-button.svg';
import imageAvatar from './images/avatar.svg';
import imageButtonClose from './images/close-button.svg';
import imageButtonEdit from './images/edit-button.svg';
import imageHeart from './images/heart.svg';
import imageLine from './images/Line.svg';
import imageLogo from './images/logo.svg';
import imageTrash from './images/Trash.svg';
import './index.css';

import {
  buttonEdit,
  buttonsClose,
  buttonAdd,
  popupEdit,
  popupAdd,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  popupFormEdit,
  cardNameInput,
  imageLinkInput,
  popupFormAdd,
  imagePopup,
  cardsContainer,
  cardTemplate,
  imagePopupPicture,
  imagePopupSignature,
  popupList,
  formList,
  validationSelectors,
  cardSelectors,
  initialCards
} from './scripts/utils/constants.js';

import FormValidator from "./scripts/components/FormValidator.js";
import Popup from './scripts/components/Popup.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import UserInfo from './scripts/components/UserInfo.js';

import {
  closePopup,
  openPopup,
  createCard,
  submititonEditForm,
  submititonAddForm,
  handleCardClick
} from './scripts/utils/utils.js';


const formEditValidation = new FormValidator(popupFormEdit, validationSelectors);
formEditValidation.enableFormValidation();

const formAddValidation = new FormValidator(popupFormAdd, validationSelectors);
formAddValidation.enableFormValidation();

const popupEditElement = new PopupWithForm({popupSelector: '.popup_edit', buttonOpenSelector: '.profile__edit-button', submit: submititonEditForm});
popupEditElement.setEventListeners();
popupEditElement.setInputValues([nameProfile.textContent, jobProfile.textContent]);

const popupAddElement = new PopupWithForm({popupSelector: '#popup_add', buttonOpenSelector: '.profile__add-button', submit: submititonAddForm});
popupAddElement.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({image: item.link, signature: item.name}, cardSelectors, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer);
cardList.renderItems();


export {
  popupAddElement,
  cardList
}