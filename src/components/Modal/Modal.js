import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Context } from '../App/App';
import Stats from './Stats';
import Images from './Images';
import './Modal.css';

const ModalComponent = () => {
  const { data, isOpen, handleCloseModal, activeItem } = useContext(Context);
  console.log('Modal activeItem: ', activeItem);

  return (
    <Modal
      fade="true"
      centered
      scrollable
      show={isOpen}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {activeItem.rocket_name ? activeItem.rocket_name : activeItem.name}
        </Modal.Title>
      </Modal.Header>

      <Images activeItem={activeItem} />
      
      <Modal.Body className="show-grid">
        <Container fluid>
          <Row>
            <p>
              {activeItem.description}
            </p>
          </Row>

          <Stats activeItem={activeItem} />

          <Row>
            <Col>
              <p id="wiki">
                <a href={activeItem.wikipedia} target="_blanc">Read more on Wikipedia...</a>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ModalComponent;

// <p>{activeItem.payload_weights.map(item => {
//   <p>item.name</p>
//   <p>item.kg</p>
//   <p>item.lb</p>
// })}</p>
