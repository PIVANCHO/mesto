import {imagePopup, imagePopupPicture, imagePopupSignature, openPopup} from './index.js';

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



class Card {
  constructor(image, signature, cardSelectors) {
    this._image = image;
    this._signature = signature;
    this._cardSelectors = cardSelectors;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelectors.template)
      .content
      .querySelector(this._cardSelectors.element)
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton(cardLikeButton) {
    cardLikeButton.classList.toggle(this._cardSelectors.likeActive);
  }

  _handleDeleteButton(cardDeleteButton) {
    const item = cardDeleteButton.closest(this._cardSelectors.element);
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
    this._cardImage = this._element.querySelector(this._cardSelectors.image);
    this._cardSignature = this._element.querySelector(this._cardSelectors.signature);
    this._like = this._element.querySelector(this._cardSelectors.like);
    this._delete = this._element.querySelector(this._cardSelectors.delete);


    this._cardImage.src = this._image;
    this._cardImage.alt = this._signature;
    this._cardSignature.textContent = this._signature;

    this._setEventListeners(this._like, this._delete, this._cardImage);

    return this._element;
  }
}



export {initialCards, Card}