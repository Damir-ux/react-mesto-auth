import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Form({ name, titleButton, children, isValid, onSubmit }) {
  const isSend = useContext(CurrentUserContext);
  return (

{children}
{{login:
    <button className={"profile__avatar" type="button" onClick={onEditAvatar}>
    <img src={currentUser.avatar} alt="Место" className="profile__under-img" />
  </button>

}}


  );
}
