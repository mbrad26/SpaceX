import React from 'react';

const List = ({ data }) => {
  return (
    <ul>{data.map(item =>
      <li key={item.id}>
        {item.flickr_images.map((url) => <img src={url} key={url} width='200'/>)}
      </li>)}
    </ul>
  )
}

export default List;
