import React, { useContext } from 'react';
import { Navbar as NavBar, Container, Image } from 'react-bootstrap';

import './Navbar.css';
import Context from '../../context/context.js';
import logo from '../../assets/SpaceX-Logo.svg';


const Navbar = () => {
  const { handleClick } = useContext(Context);
  const handleRefresh = () => window.location.reload();

  return (
    <NavBar expand='lg'>
      <Container className="links-container">
        <button onClick={handleRefresh}>
          <Image
            src={logo}
            className='d-inline-block align-top'
            alt=''
            loading='lazy'
          />
        </button>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <button className='nav-link' onClick={handleClick}>ROCKETS</button>
          </li>
          <li className='nav-item'>
            <button className='nav-link' onClick={handleClick}>DRAGONS</button>
          </li>
        </ul>
      </Container>
    </NavBar>
  )
};

export default Navbar;
