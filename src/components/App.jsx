import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import unionTrue from "../images/unionTrue.png";
import unionFalse from "../images/unionFalse.png";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import { register, authorize, getContent } from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    imgPath: "",
    text: "",
  });

  const navigate = useNavigate();

  const [infoTooltip, setInfoTooltip] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setUserCards] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  const setCloseAllPopupups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setDeletePopupOpen(false);
  }, []);

  const handleInfoTooltip = () => {
    setInfoTooltip(!infoTooltip);
  };

  const closePopupEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setCloseAllPopupups();
        document.removeEventListener("keydown", closePopupEsc);
      }
    },
    [setCloseAllPopupups]
  );

  const closeAllPopups = useCallback(() => {
    setCloseAllPopupups();
    document.removeEventListener("keydown", closePopupEsc);
  }, [setCloseAllPopupups, closePopupEsc]);

  function setEventListenerDoc() {
    document.addEventListener("keydown", closePopupEsc);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerDoc();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerDoc();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerDoc();
  }

  function handleDelete(cardId) {
    setDeleteId(cardId);
    setDeletePopupOpen(true);
    setEventListenerDoc();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setEventListenerDoc();
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setUserCards(dataCard);
        })
        .catch((err) => console.error(`Ошибка загрузки исходных данных ${err}`));
    }
  }, [loggedIn]);

  function handleDel(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteId)
      .then(() => {
        setUserCards(
          cards.filter((card) => {
            return card._id !== deleteId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка удаления картинки ${err}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка обновления профиля ${err}`));
  }

  function handleUpdateAvatar(dataCard, reset) {
    api
      .setAvatar(dataCard)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка обновления аватара ${err}`));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .addCard(dataCard)
      .then((res) => {
        setUserCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка добавления карточки ${err}`));
  }

  // useEffect(() => {
  //   if (loggedIn) {
  //     Promise.all([api.getInfoUser(), api.getCardsList()])
  //       .then(([userData, dataCards]) => {
  //         setCurrentUser(userData);
  //         setUserCards(dataCards);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [loggedIn]);

  function handleRegister(password, email) {
    register(password, email)
      .then(() => {
        setInfoTooltip(true);
        navigate("/sing-in");
        // setEmail(res.data.email);
        setMessage({
          imgPath: unionTrue,
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        setInfoTooltip(true);
        console.log(err);
        setMessage({
          imgPath: unionFalse,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");

  //   if (jwt) {
  //     getContent(jwt)
  //       .then((res) => {
  //         setEmail(res.data.email);
  //         setLoggedIn(true);
  //         navigate("/", { replace: true });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [navigate]);

  // const onSingOut = () => {
  //   localStorage.removeItem("jwt");
  //   setLoggedIn(false);
  //   navigate("/sing-in");
  // };

  function handleLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setInfoTooltip(true);
        setMessage({
          imgPath: unionFalse,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.error(`Ошбика при авторизации ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sing-in"
            element={
              <>
                <Header name="singin" /> <Main name="singin" onLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/sing-up"
            element={
              <>
                <Header name="singup" /> <Main name="singup" onRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDelete={handleDelete}
                cards={cards}
                loggedIn={loggedIn}
                email={email}
                // onSingOut={onSingOut}
              />
            }
          />
        </Routes>
        {/* <Header /> */}
        {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDelete}
          cards={cards}
        /> */}
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="popup_type_delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDel}
        />

        <InfoTooltip isOpen={infoTooltip} onClose={handleInfoTooltip} message={message} />

        <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
