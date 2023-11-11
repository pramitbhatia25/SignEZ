import React from "react"
import { Link } from "react-router-dom"
import './index.css'
import { useState } from "react";

function Header(props) {
    const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

    const toggleAccountMenu = () => {
        setAccountMenuOpen(!isAccountMenuOpen);
      };

    function logOutUser() {
        document.cookie = 'email' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/"
    }

    function gotostats() {
        window.location = "/stats"
    }

      return <>
    <div className="navbar">
    <Link to="/" className="logo">
        <div className="logo1">
            Sign
        </div>
        <div className="logo2">
            EZ
        </div>
    </Link>
    <div className="navs">
        <a href="/#about"className="about">
            <div className="about1">
                about
            </div>
        </a>
        <Link onClick={props.openLogIn} className={!props.signedIn ? 'login' : 'hide_nav'}>
            <div className="login1">
                login
            </div>
        </Link>
        <Link onClick={props.openSignUp} className={!props.signedIn ? 'signup' : 'hide_nav'}>
            <div className="signup1">
                signup
            </div>
        </Link>
        <Link             onClick={toggleAccountMenu}
        className={props.signedIn ? 'account': 'hide_nav'}>
            <div className="account1">
                account ▼
            </div>
        </Link>
        {isAccountMenuOpen && (
            <div className="account-menu">
            <Link onClick={gotostats} className="account-menu-item">
            Stats
          </Link>
          <Link to="/redeem" className="account-menu-item">
          Redeem
        </Link>
    <Link to="/practice" className="account-menu-item">
                Practice
              </Link>
              <Link onClick={logOutUser} className="account-menu-item">
                Logout
              </Link>
            </div>
          )}
    </div>
</div>

    </>
}

export default Header;