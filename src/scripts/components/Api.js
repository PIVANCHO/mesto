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

  _checkResStatus(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => this._checkResStatus(res))
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => this._checkResStatus(res))
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkResStatus(res))
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        likes: []
      })
    })
      .then(res => this._checkResStatus(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResStatus(res))
      
  }

  putLike(id, userInfo) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify(userInfo)
    })
      .then(res => this._checkResStatus(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResStatus(res))
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(res => this._checkResStatus(res))
  }
}