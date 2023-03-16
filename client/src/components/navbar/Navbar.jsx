import React from 'react';
import { Link } from 'react-router-dom';
import { FaHamburger } from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
  const [showNav, setShowNav] = React.useState(false);

  const handleMenuClick = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className='container-navbar'>
      <h1 className='navbar-title'><Link to ="/">Jarbram</Link></h1>
      <div className='btn-loginSignup'>
        <Link to='/login'>
          <button className='btn-login'>Login</button>
        </Link>
        <Link to='/signup'>
          <button className='btn-signUp'>Sign Up</button>
        </Link>
      </div>
      <ul className={showNav ? 'navigation open' : 'navigation'}>
        <li className='navbar-item'>
          <a href='#services'>Services</a>
        </li>
        <li className='navbar-item'>
          <a href='#projects'>Projects</a>
        </li>
        <li className='navbar-item'>
          <a href='#about'>About</a>
        </li>
      </ul>
      <div className='hamburger' onClick={handleMenuClick}>
        <FaHamburger />
      </div>
    </nav>
  );
};

export default Navbar;
