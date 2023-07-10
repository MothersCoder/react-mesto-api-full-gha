import React from "react";

function InfoTooltip(props) {
  const openModal = (status) => {
    return status ? 'popup_opened' : ''
  }

  return (
    <div className={`popup popup_type_${props.name} ${openModal(props.isOpen)}`}>
    <div className="popup__notification-container">
      <button type="button" className="popup__close" onClick = {props.onClose}></button>
      <img className="popup__notification-image" src={props.statusIcon} alt={props.statusMessage}/>
      <h3 className="popup__notification-title">{props.title}</h3>
      <h4 className="popup__notification-subtitle">{props.errorText}</h4>
    </div>
  </div>
  )
}
export default InfoTooltip
