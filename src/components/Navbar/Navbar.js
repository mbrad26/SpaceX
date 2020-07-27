import React, { useContext } from 'react';
import './Navbar.css';
import logo from './SpaceX-Logo.wine.svg';
import { Context } from '../App/App';

const Navbar = () => {
  const { handleClick } = useContext(Context);

  return (
    <nav className="navbar navbar-light navbar-expand-lg">
      <div className="container links-container">

        <a href="#">
          <img
            src={logo}
            className="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
        </a>
        
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href='#' onClick={handleClick}>ROCKETS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"href='#' onClick={handleClick}>DRAGONS</a>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;
