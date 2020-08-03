import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('calls handleRefresh', () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    const context = {
      handleClick: jest.fn()
    }
    const { container } = render(
      <Context.Provider value={context}>
        <Navbar />
      </Context.Provider>
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
