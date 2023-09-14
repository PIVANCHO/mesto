import { cardSelectors,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile
} from './constants.js';

import { 
  popupAddElement,
  userInfo,
  api,
  popupChangeAvatarElement
} from '../../index.js';

import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteSubmition from '../components/PopupDeleteSubmition.js';
import Api from '../components/Api.js';

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

function submititonEditForm() {
  api.editUserInfo({
    name: nameInput.value,
    about: jobInput.value
  });
}

function submititonAddForm() {
  const cardValues = popupAddElement.getInputValues();
  api.addCard({
    name: cardValues[0],
    link: cardValues[1],
    likes: []
  });
}

function submitionChangeAvatarForm() {
  const avatarUrl = popupChangeAvatarElement.getInputValues()[0];
  api.changeAvatar(avatarUrl);
}

const popupImage = new PopupWithImage('.popup_picture');

function handleCardClick(name, link) {
  popupImage.setEventListeners();
  popupImage.open(name, link);
}

function handleDeleteClick(cardId) {
  const deletePopup = new PopupDeleteSubmition({ popupSelector: this._cardSelectors.deletePopup });
  deletePopup.setEventListeners();
  deletePopup.open();
  deletePopup.setDeleteSubmition(cardId);
}

export {
  closeByEsc,
  closePopup,
  openPopup,
  createCard,
  submititonEditForm,
  submititonAddForm,
  handleCardClick,
  handleDeleteClick,
  submitionChangeAvatarForm
}