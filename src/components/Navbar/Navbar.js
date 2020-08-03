import React, { useContext } from 'react';
import logo from './SpaceX-Logo.wine.svg';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Context } from '../App/App';
import './NavBar.css';

const NavBar = () => {
  const { handleClick } = useContext(Context);

  return (
    <Navbar expand="lg">
      <Container className="links-container">
          <Image
            src={logo}
            className="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <button className="nav-link" onClick={handleClick}>ROCKETS</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={handleClick}>DRAGONS</button>
          </li>
        </ul>
      </Container>
    </Navbar>
  )
};

export default NavBar;
