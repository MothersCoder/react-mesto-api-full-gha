import React from 'react';

function ImagePopup (props) {
  const openImagePopup = (status) => {
    return status ? 'popup_opened' : ''
  }

  return (
    <div className={`popup popup_dark-background popup_type_fullphoto ${openImagePopup(props.isOpen)}`}>
      <div className="popup__fullimg">
        <button type="button" className="popup__close" onClick = {props.onClose}></button>
        <img className="popup__photo" src={`${props.data.link}`} alt={props.data.name} />
        <h3 className="popup__caption">{props.data.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;
