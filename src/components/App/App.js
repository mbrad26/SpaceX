import React, { useContext } from 'react';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';
import ModalComponent from '../Modal/Modal';
import Context from '../../context/context.js';
import './App.css';

import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  const { isError, loading, isOpen } = useContext(Context);
  console.log('Comp A');

  return (
    <div>
      <NavBar />
      <Container id="title">
        <Row className='justify-content-center'>
          <Col lg={12}>
            <h2>
              “You want to wake up in the morning and think the future is going
              to be great - and that’s what being a spacefaring civilization is all
              about. It’s about believing in the future and thinking that the future
              will be better than the past. And I can’t think of anything more
              exciting than going out there and being among the stars.”
            </h2>
            <h2 className="text-right">
              -Elon Musk
            </h2>
          </Col>
        </Row>
      </Container>
      <Container>
        {isError && <h3>Something is wrong ...</h3>}

        {loading ? <p>Loading ...</p> : <List />}

        {isOpen && <ModalComponent />}
      </Container>
    </div>
  )
};

export default App;
