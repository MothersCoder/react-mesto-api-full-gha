import React from "react";
import AuthForm from "./AuthForm";

function Login (props) {

  return (
    <div className="main">
      <section className="auth-form">
        <AuthForm
          title = "Вход"
          textButton = "Войти"
          autoCompletePassword = "current-password"
          autoCompleteEmail = "email"
          onSubmit = {props.onSubmit}
          name = "loginForm"
        />
      </section>
    </div>
    )
}

export default Login
