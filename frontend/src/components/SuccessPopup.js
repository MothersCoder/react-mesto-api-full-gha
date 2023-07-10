import React from "react";
import InfoTooltip from "./InfoTooltip";
import success from "../images/notification-popup/success.svg"

function SuccessPopup(props) {
  return (
    <InfoTooltip
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      name = "signUpConfirm"
      statusIcon = {success}
      title = "Вы успешно зарегистрировались!"
      statusMessage = "Индикатор успешного запроса"
    />
  )
}

export default SuccessPopup
