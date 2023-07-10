export const newCardSelectors = {
  titleInput: '.popup__input_type_placename',
  linkInput: '.popup__input_type_picturelink',
  template: '#place__item',
  item: '.place__item',
  image: '.place__image',
  title: '.place__title',
  like: '.place__like',
  likeNum: '.place__like-count',
  likeActive: 'place__like_active',
  delete: '.place__delete',
  addButton: '.profile__add-button',
  fullPhotoModal: '.popup_type_fullphoto',
  photo: '.popup__photo',
  photoCaption: '.popup__caption',
}

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const popupSelectors = {
  profile: '.popup_type_profile',
  newPlaceCard: '.popup_type_newcard',
  fullPhoto: '.popup_type_fullphoto',
  confirm: '.popup_type_confirm',
  changeUserPhoto: '.popup_type_newuserphoto',
  button: '.popup__button'
}

export const profileSelectors = {
  name: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__avatar'
}
