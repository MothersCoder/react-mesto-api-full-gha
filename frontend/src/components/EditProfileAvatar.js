import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfileAvatar (props) {
  const formInputs = useFormAndValidation({
    link: ''
  });

  useEffect (() => {
    formInputs.resetForm();
  }, [props.isOpen])

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: formInputs.values.link
    })
  }

  return (
  <PopupWithForm
    name = "newuserphoto"
    title = "Обновить аватар"
    onSubmit = {handleSubmit}
    isOpen = {props.isOpen}
    onClose = {props.onClose}
    textButton = {props.textButton}
    validation = {formInputs.isValid}
    >
      <>
        <input id="link-avatar-input" className="popup__input popup__input_type_avatarlink" value = {formInputs.values.link} onChange = {formInputs.handleChange} type="url" name="link" placeholder="Ссылка на аватарку" minLength="2" required />
        <div className="popup__error-zone">
          <span className={`link-avatar-input-error popup__error ${formInputs.isValid ? `` : `popup__error_visible`}`}>{formInputs.errors.link}</span>
        </div>
      </>
  </PopupWithForm>
  )
}

export default EditProfileAvatar
