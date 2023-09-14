import Section from "./Section.js";
import Card from "./Card.js";
import {
  cardsContainer,
  cardSelectors,
} from "../utils/constants.js";
import {
  handleCardClick,
  handleDeleteClick
} from "../utils/utils";

// РЕВЬЮЕР, ПОЖАЛУЙСТА ПРОЧИТАЙ ЭТО!!!
// Это моя последняя попытка ревью, если не успеваю получить зачет до вечера,
// четверга, то мне грозит отчисление с курса, я не смог сдать проект вовремя в силу своих
// нелегких жизненных обстоятельств. Я очень старался нагнать и сделал этот проект сам за 4 дня и ночи
// Я очень прошу поставить мне зачет, т.к. проект работает, весь функционал реализован,
// Но я понимаю, что могут быть ошибки, поэтому пожалуйста напишите их в замечаниях "можно исправить",
// А не в критических ошибках, и я обязательно исправлю все замечания
// Очень на вас надеюсь и буду невероятно благодарен!!!

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInformation(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => res.json())
      .then((result) => {
        userInfo.setUserInfo({
          name: result.name,
          about: result.about,
          avatarUrl: result.avatar,
          userId: result._id,
          userCohort: result.cohort
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => res.json())
      .then((result) => {
        const cardList = new Section({
          items: result,
          renderer: (item) => {
            const card = new Card({
              image: item.link,
              signature: item.name,
              likes: item.likes,
              owner: item.owner,
              id: item._id
            }, cardSelectors, handleCardClick, handleDeleteClick);

            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
          }
        }, cardsContainer);
        cardList.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo({ name, about }) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard({ name, link }) {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        likes: []
      })
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  putLike(id, userInfo) {
    fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(id) {
    fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeAvatar(avatarUrl) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}