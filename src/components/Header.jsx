import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">TicketSwap</div>
      <nav className="header__nav">
        <a href="#">Home</a>
        <a href="#">News</a>
        <a href="#">Contact</a>
        <a href="#">Login</a>
      </nav>
    </header>
  );
};

export default Header;
