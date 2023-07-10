import React from "react";
import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup (props) {
  const currentUser = useContext(CurrentUserContext);
  const formInputs = useFormAndValidation({
    firstname: '',
    about: ''
  })

  useEffect (() => {
    formInputs.setValues({
      firstname: currentUser.name ?? "",
      about: currentUser.about ?? ""
    })
  }, [currentUser, props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: formInputs.values.firstname,
      about: formInputs.values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      name = "profile"
      title = "Редактировать профиль"
      textButton = {props.textButton}
      validation = {formInputs.isValid}
      >
        <>
          <input id="name-input" className="popup__input popup__input_type_name" value={formInputs.values.firstname} onChange = {formInputs.handleChange} type="text" name="firstname" placeholder="Имя" minLength="2" maxLength="40" required />
          <div className="popup__error-zone">
            <span className={`name-input-error popup__error ${formInputs.isValid ? `` : `popup__error_visible`}`}>{formInputs.errors.firstname}</span>
          </div>
          <input id="about-input" className="popup__input popup__input_type_about" value={formInputs.values.about} onChange = {formInputs.handleChange} type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
          <div className="popup__error-zone">
            <span className={`about-input-error popup__error ${formInputs.isValid ? `` : `popup__error_visible`}`}>{formInputs.errors.about}</span>
          </div>
        </>
    </PopupWithForm>
  )
}

export default EditProfilePopup
