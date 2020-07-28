import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Context } from '../App/App';

const ModalComponent = ({ item }) => {
  const { data, isOpen, handleCloseModal } = useContext(Context);
  console.log('Modal data: ' + data);
  console.log('Modal isOpen:' + isOpen);
  console.log('Modal item: ' + item);

  return (
    <Modal
      show={isOpen}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton={handleCloseModal}>
        <Modal.Title>
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">

        <Carousel>
          {item.flickr_images.map(url =>
            <Carousel.Item key={url}>
              <img
                className="w-100 image"
                src={url}
                alt="First slide"
              />
            </Carousel.Item>
          )}
         </Carousel>

        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
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
