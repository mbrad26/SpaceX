import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Context from '../../context/context.js';
import { Provider } from '../../context/provider.js';
import NavBar from '../../components/NavBar/NavBar.js';

describe('NavBar', () => {
  it('renders snapshot', () => {
    const { container } = render(
      <Provider>
        <NavBar />
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
    }.js
    const { container } = render(
      <Provider value={context}>
        <NavBar />
      </Provider>
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
