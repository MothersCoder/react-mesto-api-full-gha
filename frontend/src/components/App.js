import '../index.css';
import React from 'react';
import { useState, useEffect} from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Header from '../components/Header';
import Main from '../components/Main'
import Footer from '../components/Footer';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import EditProfilePopup from './EditProfilePopup';
import EditProfileAvatar from './EditProfileAvatar';
import AddPlacePopup from './AddPlacePopup';
import SuccessPopup from './SuccessPopup';
import ErrorPopup from './ErrorPopup';
import Login from './Login';
import Register from './Register';
import ErrorPage from './ErrorPage';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import * as Auth from './Auth'

function App() {

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState(null);

  const [cards, setCards] = useState([]);

  const [deleteCard, setDeleteCard] = useState([]);

  const [textButtonContent, setTextButtonContent] = useState ('');

  const [loggedIn, setLoggedIn] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  function renderLoading(isLoading, textIsLoading, textLoaded) {
    isLoading ? setTextButtonContent(textIsLoading) : setTextButtonContent(textLoaded);
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if(loggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch((err) => console.log(`${err}`))
    }
  }, [loggedIn])

  useEffect(() => {
    if(loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data.reverse())
        })
        .catch((err) => console.log(`${err}`))
    }
  }, [loggedIn])

  function tokenCheck() {
    Auth.getContent()
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate(location.pathname)
        } else {
          setLoggedIn(false)
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(`Произошла ошибка ${err}: ${err.message}`);
      })
  }

  function setDefaultProfileButtonContent () {
    setTextButtonContent('Сохранить');
  }

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
    setDefaultProfileButtonContent();
  }

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
    setDefaultProfileButtonContent();
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
    setTextButtonContent('Создать');
  }

  function handleSignUpSubmit (e, data) {
    e.preventDefault();
    Auth.register(data.email, data.password)
      .then(res => {
        setSuccessPopupOpen(true);
      })
      .then(() => {
        navigate('/sign-in', {replace: true})
      })
      .catch ((err) => {
        setErrorMessage(err);
        setErrorPopupOpen(true);
      })
  }

  function handleSignInSubmit (e, data) {
    e.preventDefault();
    Auth.login(data.email, data.password)
      .then((res) => {
        setLoggedIn(true)
        navigate('/main', {replace: true})
        setUserEmail(data.email)
      })
    .catch((err) => {
      setErrorMessage(err);
      setErrorPopupOpen(true);
    })
  }

  function signOut () {
    navigate('/sign-in', {replace: true});
    setLoggedIn(false)
  }

  function closeAllPopups () {
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSuccessPopupOpen(false);
    setErrorPopupOpen(false);
  }

  function handleCardClick (cardData) {
    setSelectedCard({name: cardData.name, link: cardData.link});
    setImagePopupOpen(true);
  }

  function handleCardLike (cardData) {
    const isLiked = cardData.likes.some(item => item === currentUser._id);

    api.changeLikeCardStatus(cardData._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardData._id ? newCard : c));
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleCardDelete (cardData) {
    renderLoading(true, 'Удаляем...', 'Да');
    api.deletCard(cardData._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardData._id));
        closeAllPopups();
        })
      .finally(() => {
        renderLoading(false, 'Удаляем...', 'Да');
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateUser (data) {
    renderLoading(true, 'Сохранение...', 'Сохранить');
    api.addUserInfo(data)
      .then((state) => {
        setCurrentUser(state);
        closeAllPopups();
      })
      .finally(() => {
        renderLoading(false, 'Сохранение...', 'Сохранить');
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateAvatar (data) {
    renderLoading(true, 'Сохранение...', 'Сохранить');
    api.loadNewUserPhoto(data)
    .then((state) => {
      setCurrentUser(state);
      closeAllPopups();
    })
    .finally(() => {
      renderLoading(false, 'Сохранение...', 'Сохранить');
    })
    .catch((err) => console.log(`${err}`))
  }

  function handleAddPlaceSubmit (data) {
    renderLoading(true, 'Создание карточки...', 'Создать');
    api.addNewPlace(data)
      .then ((state) => {
        setCards([state, ...cards]);
        closeAllPopups();
      })
      .finally(() => {
        renderLoading(false, 'Создание карточки...', 'Создать');
      })
      .catch((err) => console.log(`${err}`))
  }

  function confirmPopupOpen (data) {
    setConfirmPopupOpen(true);
    setTextButtonContent('Да');
    setDeleteCard(data);
  }

  if (loggedIn === null) {
    return (
      <div className="page">
        <div className="page__content">
          <h2 style={{
            color: "grey",
            textAlign: 'center'
          }}>
            Loading...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              loggedIn={loggedIn}
              email = {userEmail}
              onClick = {signOut}
            />

            <Routes>
              <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
                <Route path="/main" element={<ProtectedRouteElement
                  element = {Main}
                  onEditProfile = {handleEditProfileClick}
                  onAddPlace = {handleAddPlaceClick}
                  onEditAvatar = {handleEditAvatarClick}
                  cards = {cards}
                  onCardClick = {handleCardClick}
                  onCardLike = {handleCardLike}
                  onConfirm = {confirmPopupOpen}
                  loggedIn={loggedIn} /> }
                />

                <Route path="/sign-up" element={
                  <Register
                    onSubmit = {handleSignUpSubmit}
                  />}
                />

                <Route path="/sign-in" element={
                  <Login
                    onSubmit = {handleSignInSubmit}
                  />}
                />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

            <Footer />

            <EditProfilePopup
              isOpen = {isEditProfilePopupOpen}
              onClose = {closeAllPopups}
              onUpdateUser = {handleUpdateUser}
              textButton = {textButtonContent}
            />
            <EditProfileAvatar
              isOpen = {isEditAvatarPopupOpen}
              onClose = {closeAllPopups}
              onUpdateAvatar = {handleUpdateAvatar}
              textButton = {textButtonContent}
            />

            <AddPlacePopup
              isOpen = {isAddPlacePopupOpen}
              onClose = {closeAllPopups}
              onAddPlace = {handleAddPlaceSubmit}
              textButton = {textButtonContent}
            />

            <ConfirmPopup
              isOpen = {isConfirmPopupOpen}
              onClose = {closeAllPopups}
              deletCard = {handleCardDelete}
              cardData = {deleteCard}
              textButton = {textButtonContent}
            />

            <ImagePopup
              isOpen = {isImagePopupOpen}
              data = {selectedCard}
              onClose = {closeAllPopups}
            />

            <ErrorPopup
              isOpen = {isErrorPopupOpen}
              onClose = {closeAllPopups}
              error = {errorMessage}
            />

            <SuccessPopup
              isOpen = {isSuccessPopupOpen}
              onClose = {closeAllPopups}
            />

          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
