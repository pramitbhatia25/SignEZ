import React, { useState } from 'react';
import "./header.css"

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="header">
      <div className="navbar">
        <img src={require('../../images/logo.jpg')} alt="logo" className="logo_img" />
        <div className={`menu-icon ${isDrawerOpen ? 'open' : ''}`} onClick={toggleDrawer}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <nav className={`nav-menu ${isDrawerOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>Solutions</li>
          <li>Company</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
