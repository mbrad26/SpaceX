import React from 'react';
import { render } from '@testing-library/react';

import { itemOne, dragon } from '../fixtures.js';
import Stats from '../../components/Modal/Stats.js';

describe('Stats', () => {
  it('renders snapshot', () => {
    const { container } = render(<Stats activeItem={itemOne}/>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the right props when activeItem is dragon', () => {
    const { container } = render(<Stats activeItem={dragon}/>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
