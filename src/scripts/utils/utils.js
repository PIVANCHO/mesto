import { cardSelectors,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile
} from './constants.js';

import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteSubmition from '../components/PopupDeleteSubmition.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'c9b7efae-7f97-476c-990c-4201f3b7e508',
    'Content-Type': 'application/json'
  }
});

function createCard({image, signature, likes, owner, id}, userInfo, cardSelectors, handleCardClick, handleDeleteClick, handleLikeClick) {          //Creating a card
  const card = new Card({
    image: image,
    signature: signature,
    likes: likes,
    owner: owner,
    id: id
  }, userInfo, cardSelectors, handleCardClick, handleDeleteClick, handleLikeClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleLikeClick(cardLikeButton, likeActiveSelector, cardId, cardOwner, likeAmount) {
  if (!cardLikeButton.classList.contains(likeActiveSelector)) {
    cardLikeButton.classList.toggle(likeActiveSelector);
    api.putLike(cardId, cardOwner)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
    });

    likeAmount.textContent = parseInt(likeAmount.textContent) + 1;
  } else {
    cardLikeButton.classList.toggle(likeActiveSelector);
    api.deleteLike(cardId)
      .then((result) => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
    
      likeAmount.textContent = parseInt(likeAmount.textContent) - 1;
  }
}

export {
  createCard,
  handleLikeClick
}