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
        <a href="#">
          <Image
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
      </Container>
    </Navbar>
  )
};

export default NavBar;
