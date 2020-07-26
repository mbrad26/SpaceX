import React from 'react';

const List = ({ data }) => {
  return (
    <ul>
      {data.map(
        item => <Item key={item.id} item={item} />
      )}
    </ul>
  )
};

const Item = ({ item }) => {
  return (
    <li>
      {item.flickr_images.map(
        url => <img src={url} key={url} width='200' />
      )}
    </li>
  )
};

export default List;
