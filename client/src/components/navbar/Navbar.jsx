import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCar } from "react-icons/ai";
import "./navbar.css";

const Navbar = ({ isLoginVisible, isSignUpVisible, isHamburgerVisible,currentPage}) => {
  const [showNav, setShowNav] = useState(false);

  const handleMenuClick = () => {
    setShowNav(!showNav);
  };

  return (
    <nav>
      <div className="container-navbar">
        <h1>
          <Link className="navbar-title" to={`/${currentPage}`}>
            Jarbram
          </Link>
        </h1>
        <div className="btn-loginSignup">
          {isLoginVisible && (
            <Link to="/login">
              <button className="btn-login">Login</button>
            </Link>
          )}
          {isSignUpVisible && (
            <Link to="/signup">
              <button className="btn-signUp">Sign Up</button>
            </Link>
          )}
        </div>
        <ul className={showNav ? "navigation open" : "navigation"}>
          <li className="navbar-item">
            <Link to="#services">Services</Link>
          </li>
          <li className="navbar-item">
            <Link to="#projects">Projects</Link>
          </li>
          <li className="navbar-item">
            <Link to="#about">About</Link>
          </li>
        </ul>
        {isHamburgerVisible && (
          <div className="hamburger" onClick={handleMenuClick}>
            <AiFillCar />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
