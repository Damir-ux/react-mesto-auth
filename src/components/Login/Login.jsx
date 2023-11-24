import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import React from "react";

function Login({ onLogin, handleShowInfoMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      password,
      email,
    });
  };

  function onHavigeteRegister() {
    navigate("/sing-up", { replace: true });
  }

  return (
    <>
      <Header title="Регистрация" onClick={onHavigeteRegister} isOpen={false} />
      <form className="authorization__conteiner" onSubmit={handleSubmit}>
        <h1 className="authorization__title">Вход</h1>

        <input
          id="form-email"
          name="inputEmail"
          className="authorization__input"
          type="email"
          required
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="form-opened-account"
          name="inputOpened"
          className="authorization__input"
          type="password"
          required
          placeholder="Пароль"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="authorization__button">Войти</button>
      </form>
    </>
  );
}

export default Login;
