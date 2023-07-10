import React from 'react';
import { useEffect } from 'react';
import { usePopupAdditionalClose } from '../hooks/usePopupAdditionalClose';

function PopupWithForm (props, e) {
  const popupAdditionalClose = usePopupAdditionalClose(props.onClose, e.target)

  useEffect(() => {
    if (!props.isOpen) return;
    popupAdditionalClose.closeByEscape(e);
    document.addEventListener('keydown', popupAdditionalClose.closeByEscape);

    return () => document.removeEventListener('keydown', popupAdditionalClose.closeByEscape)
}, [props.isOpen, props.onClose])

  const openModal = (status) => {
    return status ? 'popup_opened' : ''
  }

  const overlayClick = () => {
    popupAdditionalClose.handleOverlay(e);
  }

  return (
      <div className={`popup popup_type_${props.name} ${openModal(props.isOpen)}`} onClick={overlayClick}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick = {props.onClose}></button>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={`${props.name}`} onSubmit = {props.onSubmit} noValidate>
            {props.children}
            <button type="submit" className={`popup__button ${props.validation ? '' : 'popup__button_disabled'}`} disabled={props.validation ? '' : false}>{props.textButton}</button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm
