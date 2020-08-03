import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/NavBar/NavBar.js';
import { Context } from '../../components/App/App.js';

describe('NavBar', () => {
  it('renders snapshot', () => {
    const context = {
      handleClick: jest.fn()
    }
    const { container } = render(
      <Context.Provider value={context}>
        <Navbar />
      </Context.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
