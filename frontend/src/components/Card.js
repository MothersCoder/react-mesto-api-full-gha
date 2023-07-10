import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card (props) {

  function handleClick () {
    props.onClick(props.data)
  }

  function handleLikeClick () {
    props.onLikeClick(props.data)
  }

  function handleDeleteClick () {
    props.onConfirm(props.data);
/*     props.onDeleteClick(props.data); */
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === props.data.owner._id;
  const isLiked = props.data.likes.some(item => item._id === currentUser._id);
  const cardLikeClassName = (
    `place__like ${isLiked && `place__like_active`}`
  );

  return (
    <li className="place__item" key={props.data._id}>
      <div className="place__image" onClick={handleClick} style={{
        backgroundImage: `url(${props.data.link})`,
        backgroundSize: 'cover'}} />
      {isOwn && <button type="button" className="place__delete" onClick = {handleDeleteClick}></button>}
      <div className="place__description">
        <h2 className="place__title">{props.data.name}</h2>
        <div className="place__like-box">
          <button type="button" className={cardLikeClassName} onClick={handleLikeClick}></button>
          <span className="place__like-count">{props.data.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
