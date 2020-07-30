import React from 'react';
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

const Images = ({ activeItem }) => (
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
)

export default Images;
