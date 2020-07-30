import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Context } from '../App/App';
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
      <Carousel>
        {activeItem.flickr_images.map(url =>
          <Carousel.Item key={url}>
            <Image
              src={url}
              alt="First slide"
            />
          </Carousel.Item>
        )}
      </Carousel>
      <Modal.Body className="show-grid">
        <Container fluid>
          <Row>
            <p>
              {activeItem.description}
            </p>
          </Row>
          <Row>
            <h3>Stats</h3>
          </Row>

          <p><span>Active: </span></p>{activeItem.active ? <p>Active</p> : <p>Decommissioned</p>}
          <p><span>Boosters: </span>{activeItem.boosters}</p>
          <p><span>Company: </span>{activeItem.company}</p>
          <p><span>Cost per launch: </span>{activeItem.cost_per_launch}</p>
          <p><span>Country: </span>{activeItem.country}</p>

          <p><span>Diameter in meters: </span>{activeItem.diameter.meters}</p>
          <p><span>Diameter in feet: </span>{activeItem.diameter.feet}</p>

          {activeItem.engines &&
            <>
              <p><span>Engines layout: </span>{activeItem.engines.layout}</p>
              <p><span>Engines number: </span>{activeItem.engines.number}</p>
              <p><span>Engines propellant 1: </span>{activeItem.engines.propellant_1}</p>
              <p><span>Engines propellant 2: </span>{activeItem.engines.propellant_2}</p>
              <p><span>Thrust at sea level in kN: </span>{activeItem.engines.thrust_sea_level.kN}</p>
              <p><span>Thrust at sea level in lbf: </span>{activeItem.engines.thrust_sea_level.lbf}</p>
            </>
          }

          <p><span>First flight: </span>{activeItem.first_flight}</p>

          {activeItem.height &&
            <>
              <p><span>Height in feet: </span>{activeItem.height.feet}</p>
              <p><span>Height in meters: </span>{activeItem.height.meters}</p>
            </>
          }

          {activeItem.landing_legs &&
            <>
              <p><span>Landing legs number: </span>{activeItem.landing_legs.number}</p>
              <p><span>Landing legs material: </span>{activeItem.landing_legs.material}</p>
            </>
          }

          {activeItem.mass &&
            <>
              <p><span>Mass in kg: </span>{activeItem.mass.kg}</p>
              <p><span>Mass lb: </span>{activeItem.mass.lb}</p>
            </>
          }

          {activeItem.rocket_type && <p><span>Rocket type: </span>{activeItem.rocket_type}</p>}

          {activeItem.second_stage &&
            <>
              <p><span>Second stage engines: </span>{activeItem.second_stage.engines}</p>
              <p><span>Second stage fuel amount: </span>{activeItem.second_stage.fuel_amount_tons}</p>
            </>
          }

          <p><span>Success rate: </span>{activeItem.success_rate_pct}%</p>
          <Row>
            <Col>
              <p id="wiki">
                <a href={activeItem.wikipedia} target="_blanc">Find more on Wikipedia...</a>
              </p>
            </Col>
            <Col>
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
