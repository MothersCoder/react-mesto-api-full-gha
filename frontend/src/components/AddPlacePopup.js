import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup (props) {
  const formInputs = useFormAndValidation({
    place: '',
    link: ''
  });

  useEffect (() => {
    formInputs.resetForm()
    formInputs.setIsvalid(false)
  }, [props.isOpen])

  function handleSubmit (e) {
    e.preventDefault();
    props.onAddPlace ({
      name: formInputs.values.place,
      link: formInputs.values.link
    });

  }

  return (
    <PopupWithForm
      name = "newcard"
      title = "Новое место"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      textButton = {props.textButton}
      validation = {formInputs.isValid}
      >
          <input id="palce-input" className="popup__input popup__input_type_placename" value = {formInputs.values.place} onChange = {formInputs.handleChange} type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required />
          <div className="popup__error-zone">
            <span className={`link-input-error popup__error ${formInputs.isValid ? `` : `popup__error_visible`}`}>{formInputs.errors.place}</span>
          </div>
          <input id="link-input" className="popup__input popup__input_type_picturelink" value = {formInputs.values.link} onChange = {formInputs.handleChange} type="url" name="link" placeholder="Ссылка на картинку" minLength="2" required />
          <div className="popup__error-zone">
            <span className={`link-input-error popup__error ${formInputs.isValid ? `` : `popup__error_visible`}`}>{formInputs.errors.link}</span>
          </div>
      </PopupWithForm>
  )
}

export default AddPlacePopup
