import React, { useContext } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import './Modal.css';
import Stats from './Stats.js';
import Images from './Images.js';
import Context from '../../context/context.js';


const ModalComponent = () => {
  const { isOpen, handleCloseModal, activeItem } = useContext(Context);

  return (
    <Modal
      fade='true'
      centered
      scrollable
      show={isOpen}
      onHide={handleCloseModal}
      data-testid='modal'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {activeItem.rocket_name ? activeItem.rocket_name : activeItem.name}
        </Modal.Title>
      </Modal.Header>

      <Images activeItem={activeItem} />

      <Modal.Body className='show-grid'>
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
              <p id='wiki'>
                <a href={activeItem.wikipedia} target='_blanc'>Read more on Wikipedia...</a>
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
