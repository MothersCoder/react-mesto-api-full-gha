import React from 'react';
import errorImg from '../images/eror-page.jpg'

function ErrorPage () {
  return (
    <div className="error-page">
      <img className="error-page__image" src={errorImg} alt="Вы ищите то, чего у нас нет... Страница не найдена." />
    </div>
  )
}

export default ErrorPage
