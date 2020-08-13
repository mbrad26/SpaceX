import React from 'react';

import { Image, Carousel } from 'react-bootstrap';

const Images = ({ activeItem }) => (
  <Carousel>
    {activeItem.flickr_images.map(url =>
      <Carousel.Item key={url}>
        <Image
          src={url}
          alt='First slide'
        />
      </Carousel.Item>
    )}
  </Carousel>
)

export default Images;
