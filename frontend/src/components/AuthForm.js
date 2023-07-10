import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AuthForm (props) {
  const formInputs = useFormAndValidation({
    email: '',
    password: ''
  })

  function handleSubmit (e) {
    e.preventDefault()
    props.onSubmit(e, formInputs.values)
  }

  return (
    <>
      <h3 className="auth-form__title">{props.title}</h3>
      <form className="auth-form__form" name={props.name} onSubmit = {handleSubmit} noValidate>
        <input id="email-input" name="email" className="auth-form__input" value={formInputs.values.email} onChange = {formInputs.handleChange} type="email"  placeholder="Email" minLength="2" maxLength="40" autoComplete={props.autoCompleteEmail} required />
        <input id="password-input" name="password" className="auth-form__input" value={formInputs.values.password} onChange = {formInputs.handleChange} type="password"  placeholder="Пароль" autoComplete={props.autoCompletePassword} required />
        <button type="submit" className="auth-form__button">{props.textButton}</button>
      </form>
    </>
  )
}

export default AuthForm
