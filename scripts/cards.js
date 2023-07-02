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

const cardLikeButton = document.querySelector('.element__like');
const cardDeleteButton = document.querySelector('.element__delete');

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

  _handleLikeButton() {
    cardLikeButton.classList.toggle('element__like_active');
  }

  _handleDeleteButton() {
    const item = cardDeleteButton.closest('.element');
    item.remove();
  }

  _setEventListeners() {
    cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__signature').textContent = this._signature;

    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});