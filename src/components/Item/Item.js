import React, { useContext } from 'react';
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Context from '../../context/context.js';

const Item = ({ item }) => {
  const { handleOpenModal } = useContext(Context);

  return (
    <>
      <CardGroup className="col-6 d-flex align-items-stretch container">
        <Card className="shadow">
          <Card.Img src={item.flickr_images[0]} alt='SpaceX' className="card-img-top" />
          <Card.Body>
            <Card.Title>
              {item.rocket_name ? item.rocket_name : item.name}
            </Card.Title>
            <Card.Text className="item-description">
              {item.description}
            </Card.Text>
            <button onClick={() => handleOpenModal(item)}>Details</button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  )
};

export default Item ;
