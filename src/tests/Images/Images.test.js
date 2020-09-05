import React from 'react';
import { render, screen } from '@testing-library/react';

import { itemOne } from '../fixtures.js';
import Images from '../../components/Modal/Images.js';


describe('Images', () => {
  it('renders snapshot', () => {
    const { container } = render(<Images activeItem={itemOne} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders all the images', () => {
    render(<Images activeItem={itemOne} />);

    expect(screen.getAllByRole('img').length).toBe(2);
  });
});
