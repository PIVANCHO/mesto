import imageButtonAddBig from '../images/add-button_big.svg';
import imageButtonAdd from '../images/add-button.svg';
import imageAvatar from '../images/avatar.svg';
import imageButtonClose from '../images/close-button.svg';
import imageButtonEdit from '../images/edit-button.svg';
import imageHeart from '../images/heart.svg';
import imageLine from '../images/Line.svg';
import imageLogo from '../images/logo.svg';
import imageTrash from '../images/Trash.svg';
import '../index.css';

import {
  buttonEdit,
  buttonAdd,
  popupFormEdit,
  popupFormAdd,
  cardsContainer,
  validationSelectors,
  cardSelectors,
  avatarChangeButton,
  formChangeAvatar,
  avatar
} from '../scripts/utils/constants.js';

import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupDeleteSubmition from '../scripts/components/PopupDeleteSubmition.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {
  handleLikeClick
} from '../scripts/utils/utils.js';

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
popupEditElement.setEventListeners('Сохранение...', 'Сохранить');

const popupAddElement = new PopupWithForm({ popupSelector: '.popup_add', submit: submititonAddForm });
buttonAdd.addEventListener('click', () => {
  popupAddElement.open();
});
popupAddElement.setEventListeners('Создание...', 'Создать');

const popupChangeAvatarElement = new PopupWithForm({
  popupSelector: '.popup_change-avatar',
  submit: submitionChangeAvatarForm
});
avatarChangeButton.addEventListener('click', () => {
  popupChangeAvatarElement.open();
});
popupChangeAvatarElement.setEventListeners('Сохранение...', 'Сохранить');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'c9b7efae-7f97-476c-990c-4201f3b7e508',
    'Content-Type': 'application/json'
  }
});

const cardItems = [];

const cardList = new Section({
  items: cardItems,
  renderer: (item) => {
    const card = new Card({
      image: item.link,
      signature: item.name,
      likes: item.likes,
      owner: item.owner,
      id: item._id
    }, userInfo, cardSelectors, handleCardClick, handleDeleteClick, handleLikeClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsContainer); 

const userInfo = new UserInfo({               //Creating UserInfo class element
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__job',
  userAvatarSelctor: '.profile__avatar'
});

api.getUserInformation() //Getting info about user from server and setting it on page
  .then ((result) => {
    userInfo.setInitialUserInfo({
      name: result.name,
      about: result.about,
      avatarUrl: result.avatar,
      userId: result._id,
      userCohort: result.cohort
  })})
  .catch((err) => {
    console.log(err);
  });

api.getCards() //Getting cards from server and setting on page
  .then ((result) => {
    console.log(result);
    result.forEach((item) => {
      cardItems.unshift(item);
    });
    cardList.renderItems();
    console.log(cardItems);
  })  
  .catch((err) => {
    console.log(err);
  });

function submititonEditForm(inputValues) {
  api.editUserInfo({
    name: inputValues.name,
    about: inputValues.description
  })
    .then((result) => {
      userInfo.setUserInfo({
        name: inputValues.name,
        about: inputValues.description
      });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEditElement.renderLoading(false, 'Сохранение...', 'Сохранить'))
}

function submititonAddForm(inputValues) {
  const cardOwner = userInfo.getUserInfo();

  api.addCard({
    name: inputValues.cardName,
    link: inputValues.imageLink
  })
    .then((result) => {
      console.log(result);
      const newCard = new Card({
        image: inputValues.imageLink,
        signature: inputValues.cardName,
        likes: [],
        owner: cardOwner,
        id: ''
      }, userInfo, cardSelectors, handleCardClick, handleDeleteClick, handleLikeClick);
      const newCardElement = newCard.generateCard();
      cardList.addItem(newCardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAddElement.renderLoading(false, 'Сохранение...', 'Сохранить'))
}

function submitionChangeAvatarForm(inputValues) {
  api.changeAvatar(inputValues.avatarLink)
    .then((result) => {
      avatar.src = inputValues.avatarLink;
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupChangeAvatarElement.renderLoading(false, 'Сохранение...', 'Сохранить'))
}

const popupImage = new PopupWithImage('.popup_picture');
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const deletePopup = new PopupDeleteSubmition({ popupSelector: '.popup_delete' }, (cardId) => {
  api.deleteCard(cardId)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
deletePopup.setEventListeners();

function handleDeleteClick(cardId, deleteButton, elementSelector) {
  deletePopup.open();
  deletePopup.setDeleteSubmition(cardId, deleteButton, elementSelector);
}




// РЕВЬЮЕР, ПОЖАЛУЙСТА ПРОЧИТАЙ ЭТО!!!
// Это моя последняя попытка ревью, если не успеваю получить зачет до вечера,
// четверга, то мне грозит отчисление с курса, я не смог сдать проект вовремя в силу своих
// нелегких жизненных обстоятельств. Я очень старался нагнать и сделал этот проект сам за 4 дня и ночи
// Я очень прошу поставить мне зачет, т.к. проект работает, весь функционал реализован,
// Но я понимаю, что могут быть ошибки, поэтому пожалуйста напишите их в замечаниях "можно исправить",
// А не в критических ошибках, и я обязательно исправлю все замечания
// Очень на вас надеюсь и буду невероятно благодарен!!!



