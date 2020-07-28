import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Context } from '../App/App';

const ModalComponent = () => {
  const { data, isOpen, handleCloseModal } = useContext(Context);
  console.log('Modal data: ' + data);
  console.log('Modal isOpen:' + isOpen);

  return (
    <Modal show={isOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton={handleCloseModal}>
        <Modal.Title>
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
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
