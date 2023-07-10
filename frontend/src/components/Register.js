import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register (props) {
  return (
    <div className="main">
      <section className="auth-form">
        <AuthForm
          title = "Регистрация"
          textButton = "Зарегистрироваться"
          autoCompletePassword = "new-password"
          autoCompleteEmail = "email"
          onSubmit = {props.onSubmit}
          name = "registerForm"
        />
        <p className="auth-form__note">Уже зарегистрированы? <Link className="auth-form__link" to="/sign-in">Войти</Link></p>
      </section>
    </div>
    )
}

export default Register
