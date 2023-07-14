const { NODE_ENV, BASE_URL } = process.env
export const baseUrl = NODE_ENV === 'production' ? BASE_URL : 'http://localhost:4000'

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} - что-то сломалось, но мы починим... `)
}

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password}),
  })
  .then(res => checkResponse(res))

}

export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then(res => checkResponse(res))
  }

export const getContent = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept':  'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then(res => checkResponse(res))
  .then(data => data)
}
