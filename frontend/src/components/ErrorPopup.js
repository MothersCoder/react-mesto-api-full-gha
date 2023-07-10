import React from "react";
import InfoTooltip from "./InfoTooltip";
import error from "../images/notification-popup/error.svg"

function ErrorPopup(props) {
  return (
    <InfoTooltip
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      name = "signInError"
      statusIcon = {error}
      title = "Что-то пошло не так! Попробуйте ещё раз."
      errorText = {props.error}
      statusMessage = "Индикатор неуспешного запроса"
    />
  )
}

export default ErrorPopup
