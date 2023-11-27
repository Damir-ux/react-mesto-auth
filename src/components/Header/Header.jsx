import logo from "../../images/logo.svg";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import React from "react";

export default function Header({ email, onSingOut, name, dataUser }) {
  const [count, setCount] = useState(0);
  function handleClick() {
    count === 0 ? setCount(1) : setCount(0);
  }

  // const burgerClassName = show ? "header__burger-nav-active" : "header__burger-nav";

  // function exit() {
  //   navigate("/sing-in", { replace: true });
  //   onSingOut();
  // }

  return (
    <>
      <header className="header">
        <img src={logo} alt="Лого" className="header__logo" />
        {name === "singup" || name === "singin" ? (
          <Link className="header__title-button" to={name === "singup" ? "/sing-in" : "/sing-up"}>
            {name !== "singup" ? "Регистрация" : "Войти"}
          </Link>
        ) : (
          <>
            <div className={`header__bar ${count !== 0 ? "header__bar_opened" : ""}`}>
              <p className="header__bar-email">{dataUser}</p>
              <button onClick={handleClick} className="header__bar-button" to={"/sign-in"}></button>
            </div>
          </>
        )}
      </header>
    </>

    // <header className="header">
    //   <img src={logo} alt="Лого" className="header__logo" />
    // </header>
  );
}
