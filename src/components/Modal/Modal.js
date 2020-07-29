import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Context } from '../App/App';

const ModalComponent = () => {
  const { data, isOpen, handleCloseModal, activeItem } = useContext(Context);
  console.log('Modal activeItem: ', activeItem);

  return (
    <Modal
      fade="true"
      centered
      show={isOpen}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {activeItem.rocket_name ? activeItem.rocket_name : activeItem.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">

        <Carousel>
          {activeItem.flickr_images.map(url =>
            <Carousel.Item key={url}>
              <Image
                className="card-img-top"
                src={url}
                alt="First slide"
              />
            </Carousel.Item>
          )}
         </Carousel>

        <Container>
          <Row>
            <Col xs={12} md={8}>
              {activeItem.description}
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
