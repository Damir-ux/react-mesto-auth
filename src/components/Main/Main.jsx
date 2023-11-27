import { useContext } from "react";
import Card from "../Card/Card.jsx";
import plusIcon from "../../images/Plus.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";

export default function Main({
  name,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
  email,
  onSingOut,
  handleRegister,
  handleLogin,
}) {
  const currentUser = useContext(CurrentUserContext);

  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");

  return (
    <main className="main">
      {name === "main" ? (
        <>
          <Header title="Выход" email={email} isOpen={true} onSingOut={onSingOut} />
          <section className="profile">
            <button className="profile__avatar" type="button" onClick={onEditAvatar}>
              <img src={currentUser.avatar} alt="Место" className="profile__under-img" />
            </button>
            <div className="profile__column">
              <div className="profile__choise">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__button-edit" type="button" onClick={onEditProfile} />
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="profile__button-add" type="button" onClick={onAddPlace}>
              <img src={plusIcon} alt="Добавление" className="profile__image" />
            </button>
          </section>
          <section className="photo-grid">
            {cards.map((data) => {
              return (
                <div className="photo-grid__item" key={data._id}>
                  <Card card={data} onCardClick={onCardClick} onDelete={onDelete} />
                </div>
              );
            })}
          </section>
        </>
      ) : name === "signup" ? (
        <Register name={name} handleRegister={handleRegister} />
      ) : (
        <Login name={name} handleLogin={handleLogin} />
      )}
    </main>
  );
}
