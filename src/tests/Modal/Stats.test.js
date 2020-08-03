import React from 'react';
import { render } from '@testing-library/react';
import { itemOne } from '../fixtures';
import Stats from '../../components/Modal/Stats.js';

describe('Stats', () => {
  it('renders all the props', () => {
    const container = render(<Stats activeItem={itemOne}/>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
