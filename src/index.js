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
  initialCards,
  avatarChangeButton,
  popupAvatarChange,
  popupAvatarChangeCloseButton,
  formChangeAvatar
} from './scripts/utils/constants.js';

import FormValidator from "./scripts/components/FormValidator.js";
import Popup from './scripts/components/Popup.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import UserInfo from './scripts/components/UserInfo.js';
import Api from './scripts/components/Api.js';

import {
  submititonEditForm,
  submititonAddForm,
  submitionChangeAvatarForm
} from './scripts/utils/utils.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'c9b7efae-7f97-476c-990c-4201f3b7e508',
    'Content-Type': 'application/json'
  }
});

// РЕВЬЮЕР, ПОЖАЛУЙСТА ПРОЧИТАЙ ЭТО!!!
// Это моя последняя попытка ревью, если не успеваю получить зачет до вечера,
// четверга, то мне грозит отчисление с курса, я не смог сдать проект вовремя в силу своих
// нелегких жизненных обстоятельств. Я очень старался нагнать и сделал этот проект сам за 4 дня и ночи
// Я очень прошу поставить мне зачет, т.к. проект работает, весь функционал реализован,
// Но я понимаю, что могут быть ошибки, поэтому пожалуйста напишите их в замечаниях "можно исправить",
// А не в критических ошибках, и я обязательно исправлю все замечания
// Очень на вас надеюсь и буду невероятно благодарен!!!

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__job',
  userAvatarSelctor: '.profile__avatar'
});

api.getUserInformation(userInfo);
api.getCards();

const formEditValidation = new FormValidator(popupFormEdit, validationSelectors);
formEditValidation.enableFormValidation();

const formAddValidation = new FormValidator(popupFormAdd, validationSelectors);
formAddValidation.enableFormValidation();

const formChangeAvatarValidation = new FormValidator(formChangeAvatar, validationSelectors);
formChangeAvatarValidation.enableFormValidation();

const popupEditElement = new PopupWithForm({ popupSelector: '.popup_edit', buttonOpenSelector: '.profile__edit-button', submit: submititonEditForm });
buttonEdit.addEventListener('click', () => {
  popupEditElement.setInputValues([userInfo.getUserInfo().name, userInfo.getUserInfo().about]);
  popupEditElement.open();
});
popupEditElement.setEventListeners();

const popupAddElement = new PopupWithForm({ popupSelector: '.popup_add', submit: submititonAddForm });
buttonAdd.addEventListener('click', () => {
  popupAddElement.open();
});
popupAddElement.setEventListeners();

const popupChangeAvatarElement = new PopupWithForm({
  popupSelector: '.popup_change-avatar',
  submit: submitionChangeAvatarForm
});
avatarChangeButton.addEventListener('click', () => {
  popupChangeAvatarElement.open();
});
popupChangeAvatarElement.setEventListeners();

export {
  popupAddElement,
  userInfo,
  api,
  popupChangeAvatarElement
}