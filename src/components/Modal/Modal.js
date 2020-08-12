import React, { useContext } from 'react';
import Context from '../../context/context.js';
import Stats from './Stats';
import Images from './Images';
import './Modal.css';

import { Container, Row, Col, Button, Modal } from "react-bootstrap";

const ModalComponent = () => {
  const { isOpen, handleCloseModal, activeItem } = useContext(Context);

  return (
    <Modal
      fade="true"
      centered
      scrollable
      show={isOpen}
      onHide={handleCloseModal}
      data-testid="modal"
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

          <div>
            <Stats activeItem={activeItem} />
          </div>

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
