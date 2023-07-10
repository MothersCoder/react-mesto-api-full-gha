import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function ConfirmPopup (props) {
  const formInputs = useFormAndValidation('');

  useEffect(() => {
    formInputs.setIsvalid(true);
  }, [props.isOpen])


  function handleSubmit (e) {
    e.preventDefault()
    props.deletCard(props.cardData);
  }

  return (
    <PopupWithForm
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      name = "confirm"
      title = "Вы уверены?"
      textButton = {props.textButton}
      validation = {formInputs.isValid}
  />
  )
}

export default ConfirmPopup
