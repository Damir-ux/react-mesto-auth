import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import React from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email,
      password,
    });
  };

  function onHavigeteLogin() {
    navigate("/sing-in", { replace: true });
  }

  return (
    <>
      <Header title="Войти" onClick={onHavigeteLogin} />
      <form className="register__conteiner" onSubmit={handleSubmit}>
        <h1 className="register__title">Регистрация</h1>

        <input
          id="form-email"
          name="inputEmail"
          className="register__input"
          type="email"
          required
          placeholder="Email"
          value={email || ""}
          minLength="2"
          maxLength="40"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          id="form-opened-account"
          name="inputOpened"
          className="register__input"
          type="password"
          required
          placeholder="Пароль"
          value={password || ""}
          minLength="2"
          maxLength="40"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerg__button">Регистрация</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <button className="register__button-exit" type="submit" onClick={onHavigeteLogin}>
          Войти
        </button>
      </p>
    </>
  );
}

export default Register;
