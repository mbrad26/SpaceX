import React from 'react';
import { render, screen } from '@testing-library/react';
import { itemOne } from '../fixtures';
import Stats from '../../components/Modal/Stats.js';

describe('Stats', () => {
  it('renders all the props', () => {
    render(<Stats activeItem={itemOne}/>);
    screen.debug();

    expect(screen.firstChild).toMatchSnapshot();
  });
});
