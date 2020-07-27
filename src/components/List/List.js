import React, { useContext } from 'react';
import { Context } from '../App/App';
import './List.css';

const List = () => {
  const data = useContext(Context);

  return (
    <div className='row justify-content-around'>
      {data.map(
        item => <Item key={item.id} item={item} />
      )}
    </div>
  )
};

const Item = ({ item }) => {
  return (
    <div className='col-6 d-flex align-items-stretch container'>
      <div className="card text-white bg-dark">
        <img src={item.flickr_images[0]} alt='SpaceX' className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title">
            {item.rocket_name ? item.rocket_name : item.name}
            </h3>
          <p className="card-text item-description">{item.description}</p>
          <a href="#" className="btn btn-primary">Details...</a>
        </div>
      </div>
    </div>
  )
};

export default List;

// {item.flickr_images.map(
//   url => <img src={url} key={url} width='400' />
// )}
