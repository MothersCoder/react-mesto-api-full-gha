import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg'

function Header(props) {
  let currentUrl = useLocation();

  function logOut () {
    props.onClick()
  }

  return (
    <header className="header">
      <a className="header__link" href="/"><img className="header__logo" src={logo} alt="Логотип сайта &quot;Место (Россия)&quot;" /></a>
      <ul className="header__navbar">
        {currentUrl.pathname === "/sign-in" && <li><Link className="header__action" to="/sign-up">Регистрация</Link></li>}
        {currentUrl.pathname === "/sign-up" && <li><Link className="header__action" to="/sign-in">Войти</Link></li>}
        {currentUrl.pathname === "/main" && <li className="header__action">{props.email}</li>}
        {currentUrl.pathname === "/main" &&  <li className="header__action">
            <button className="header__action-button" onClick={logOut}>Выход</button>
          </li>
        }
      </ul>
    </header>
  );
}

export default Header;
