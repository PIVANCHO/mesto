const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import {imagePopup, imagePopupPicture, imagePopupSignature, openPopup} from './index.js';

console.log(imagePopup);

class Card {
  constructor(image, signature) {
    this._image = image;
    this._signature = signature;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.card-template')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton(cardLikeButton) {
    cardLikeButton.classList.toggle('element__like_active');
  }

  _handleDeleteButton(cardDeleteButton) {
    const item = cardDeleteButton.closest('.element');
    item.remove();
  }

  _handleImagePopup() {
      openPopup(imagePopup);
      imagePopupPicture.src = this._image;
      imagePopupPicture.alt = this._signature;
      imagePopupSignature.textContent = this._signature;
  }

  _setEventListeners(cardLikeButton, cardDeleteButton, imageElement) {
    cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton(cardLikeButton);
    });
    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButton(cardDeleteButton);
    });
    imageElement.addEventListener('click', () => {
      this._handleImagePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__signature').textContent = this._signature;

    this._setEventListeners(this._element.querySelector('.element__like'), this._element.querySelector('.element__delete'), this._element.querySelector('.element__image'));

    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});