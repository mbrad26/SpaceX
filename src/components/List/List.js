import React from 'react';

const List = ({ data }) => {
  console.log(data);
  return (
    <div className='row justify-content-between'>
      {data.map(
        item => <Item key={item.id} item={item} />
      )}
    </div>
  )
};

const Item = ({ item }) => {
  return (
    <div className='col-5'>
      <div className="card">
        <img src={item.flickr_images[0]} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title">{item.rocket_name}</h3>
          <p className="card-text">{item.description}</p>
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
