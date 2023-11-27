import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import Header from "../Header/Header.jsx";

function AppLayout({ email, isOpen, onHamburgerClick, onLogOut }) {
  return (
    <>
      <HamburgerMenu email={email} isOpen={isOpen} onLogOut={onLogOut} />
      <Header
        email={email}
        isOpen={isOpen}
        onHamburgerClick={onHamburgerClick}
        onLogOut={onLogOut}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
