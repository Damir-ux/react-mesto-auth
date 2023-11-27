import React from "react";
import NavBar from "../NavBar/NavBar.jsx";

function Header({ email, onHamburgerClick, isOpen, onLogOut }) {
  return (
    <header className="header">
      <div className="logo header__logo"></div>
      <NavBar
        email={email}
        isOpen={isOpen}
        onHamburgerClick={onHamburgerClick}
        onLogOut={onLogOut}
      />
    </header>
  );
}

export default Header;
