import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Provider from '../../context/provider';
import Navbar from '../../components/NavBar/NavBar';
import Context from '../../context/context';

describe('NavBar', () => {
  it('renders snapshot', () => {
    const { container } = render(
      <Provider>
        <Navbar />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls handleRefresh', () => {
    // const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    const context = {
      handleClick: jest.fn()
    }
    const { container } = render(
      <Provider value={context}>
        <Navbar />
      </Provider>
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
