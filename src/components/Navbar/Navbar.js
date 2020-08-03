import React, { useContext } from 'react';
import logo from './SpaceX-Logo.wine.svg';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Context } from '../App/App';
import './NavBar.css';

const NavBar = () => {
  const { handleClick } = useContext(Context);
  const handleRefresh = () => window.location.reload();

  return (
    <Navbar expand="lg">
      <Container className="links-container">
        <button onClick={handleRefresh}>
          <Image
            src={logo}
            className="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
        </button>
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
