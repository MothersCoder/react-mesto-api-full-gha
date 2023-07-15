const { NODE_ENV, REACT_APP_BASE_URL } = process.env
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
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  addUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  addNewPlace(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

  deletCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  _like(idCard){
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })

    .then(this._checkResponse)
  }
  _deletLike(idCard){
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  changeLikeCardStatus(idCard, isLiked) {
    return isLiked ? this._like(idCard) : this._deletLike(idCard)
  }

  loadNewUserPhoto(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

}

export const api = new Api ({
  baseUrl: NODE_ENV === 'production' ? REACT_APP_BASE_URL : 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});;
