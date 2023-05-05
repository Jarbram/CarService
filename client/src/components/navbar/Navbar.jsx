import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCar } from "react-icons/ai";
import "./navbar.css";

const Navbar = ({ isLoginVisible, isSignUpVisible, isLogoutVisible,  isHamburgerVisible,isColaboradoresVisible, currentPage}) => {
  const [showNav, setShowNav] = useState(false);

  const handleMenuClick = () => {
    setShowNav(!showNav);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: "POST"
      });
      if (response.status === 200) {
        window.location.href = "/login";
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <nav>
      <div className="container-navbar" >
        <h1>
          <Link className="navbar-title" to={`/${currentPage}`}>
            Jarbram
          </Link>
        </h1>
        <div className="btn-loginSignup">
        {isColaboradoresVisible && (
          <Link to="/loginTeam">
            <button className="btn-colaboradores">Team</button>
            </Link>
        )}
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
          {(
            isLogoutVisible && (
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            )
          )}
        </div>
        <ul className={showNav ? "navigation open" : "navigation"}>
          <li className="navbar-item" >
            <Link to="/home">Tips</Link>
          </li>
          <li className="navbar-item">
            <Link to="#carService">My car</Link>
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
