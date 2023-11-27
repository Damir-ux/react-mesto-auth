import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import React from "react";
import useformValidation from "../../utils/formValidation";
import SectionLogin from "../SectionLogin/SectionLogin.jsx";

export default function Login({ name, handleLogin }) {
  const { valuen, errors, isValid, isInputValid, handleChange } = useformValidation();

  function onLogin(evt) {
    evt.preventDefault();
    handleLogin(valuen.password, valuen.email);
  }

  return (
    <>
      <SectionLogin name={name} onSubmit={onLogin} isValid={isValid}>
        <input
          id="form-email"
          name="email"
          className="authorization__input"
          type="email"
          required
          placeholder="Email"
          value={valuen.email}
          onChange={handleChange}
        />
        <input
          id="form-opened-account"
          name="password"
          className="authorization__input"
          type="password"
          required
          placeholder="Пароль"
          value={valuen.password}
          onChange={handleChange}
        />
        <button className="authorization__button">Войти</button>
      </SectionLogin>
    </>
  );
}
