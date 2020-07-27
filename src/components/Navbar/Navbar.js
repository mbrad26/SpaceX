import React from 'react';
import './Navbar.css';
import logo from './SpaceX-Logo.wine.svg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light">
      <a className="navbar-brand" href="#">
        <img
          src={logo}
          className="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
      </a>
    </nav>
  )
};

export default Navbar;
