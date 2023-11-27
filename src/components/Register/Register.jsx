import Header from "../Header/Header.jsx";
import React from "react";
import useformValidation from "../../utils/formValidation";

export default function Register({ name, handleRegister }) {
  const { valuen, errors, isValid, isInputValid, handleChange } = useformValidation();

  function onRegister(evt) {
    evt.preventDefault();
    handleRegister(valuen.password, valuen.email);
  }

  return (
    <>
      {/* <Header title="Войти" /> */}
      <form className="register__conteiner" onSubmit={onRegister}>
        <h1 className="register__title">Регистрация</h1>

        <input
          name="email"
          className="register__input"
          type="email"
          required
          placeholder="Email"
          value={valuen.email}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          isInputValid={isInputValid.email}
          error={errors.email}
        />

        <input
          name="password"
          className="register__input"
          type="password"
          required
          placeholder="Пароль"
          value={valuen.password}
          minLength="2"
          maxLength="40"
          oonChange={handleChange}
        />
        <button className="registerg__button">Регистрация</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <button className="register__button-exit" type="submit">
          Войти
        </button>
      </p>
    </>
  );
}
