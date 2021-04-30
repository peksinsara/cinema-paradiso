import React, { useState, useEffect } from "react";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useHistory, Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const history = useHistory();

  useEffect(() => {
    if (click === false) history.push("/");
    else history.push("/movies");
  }, [click, history]);

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="https://www.google.ba">
            <Logo className="logo" />
          </a>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <div className="nav-content">
          <Link to="/">
            <li>TV SHOWS</li>
          </Link>
          <Link to="/movies">
            <li>TV MOVIES</li>
            </Link>
            <Link to="/search">
            <li>SEARCH</li>
            </Link>
            
          </div>
        </ul>
        
      </div>

      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Header;
