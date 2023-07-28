import { cardSelectors,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile
} from './constants.js';

import { 
  popupAddElement,
  cardList
} from '../../index.js';

import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

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
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

function submititonAddForm() {
  const cardValues = popupAddElement._getInputValues();
  const card = new Card({image: cardValues[1], signature: cardValues[0]}, cardSelectors, handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

function handleCardClick(name, link) {
  const popupImage = new PopupWithImage('.popup_picture', {nameImage: name, sourceImage: link});
  popupImage.setEventListeners();
  popupImage.open();
}

export {
  closeByEsc,
  closePopup,
  openPopup,
  createCard,
  submititonEditForm,
  submititonAddForm,
  handleCardClick
}