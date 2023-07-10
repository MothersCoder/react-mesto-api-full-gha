export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  addUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  addNewPlace(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

  deletCard(idCard) {
    return fetch(`${this._baseUrl}cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  _like(idCard){
    return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers
    })

    .then(this._checkResponse)
  }
  _deletLike(idCard){
    return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  changeLikeCardStatus(idCard, isLiked) {
    return isLiked ? this._like(idCard) : this._deletLike(idCard)
  }

  loadNewUserPhoto(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

}

export const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '9b78af5d-f197-432f-83cc-1da3dc82bcc9',
    'Content-Type': 'application/json'
  }
});;
