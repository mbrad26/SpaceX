import React from 'react';
import { render, screen } from '@testing-library/react';
import { itemOne } from '../fixtures';
import { Context } from '../../components/App/App.js';
import ModalComponent from '../../components/Modal/Modal';

describe('Stats', () => {
  it('renders all the props', () => {
    const context = {
      isOpen: true,
      activeItem: itemOne,
      handleCloseModal: jest.fn(),
    }
    const { container } = render(
      <Context.Provider value={context}>
        <ModalComponent />
      </Context.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
