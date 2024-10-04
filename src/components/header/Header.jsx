import React, { useContext } from "react";
import "./Header.scss";
import { AuthContext } from "../../context/AuthContext";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";

const Header = () => {
  const { showForm, setShowForm } = useContext(AuthContext);

  return (
    <>
      <header className="header">
        <div className="header__logo">TicketSwap</div>
        <div className="header__nav">
          <p>Home</p>
          <p>News</p>
          <p>Contact</p>
          <p onClick={() => setShowForm("LOGIN")}>Login</p>
        </div>
      </header>
      {showForm === "LOGIN" && <Login />}
      {showForm === "REGISTER" && <Register />}
    </>
  );
};

export default Header;
