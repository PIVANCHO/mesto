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

function createCard(link, name) {          //Creating a card
  const card = new Card(link, name, cardSelectors);
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