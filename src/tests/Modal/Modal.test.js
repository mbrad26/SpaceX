import React from 'react';
import { render, screen } from '@testing-library/react';
import { itemOne, dragon } from '../fixtures';
import { Context } from '../../components/App/App.js';
import ModalComponent from '../../components/Modal/Modal';

describe('ModalComponent', () => {
  let context;

  beforeEach(() => {
    context = {
      isOpen: true,
      activeItem: itemOne,
      handleCloseModal: jest.fn(),
    }
  });

  it('renders snapshot', () => {
    const { container } = render(
      <Context.Provider value={context}>
        <ModalComponent />
      </Context.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the wright props when activeItem is dragon', () => {
    context = {
      isOpen: true,
      activeItem: dragon,
      handleCloseModal: jest.fn(),
    }
    render(
      <Context.Provider value={context}>
        <ModalComponent />
      </Context.Provider>
    );

    expect(screen.getByText('Dragon 1')).toBeInTheDocument();
  });

  it('renders the wright props when activeItem is rocket', () => {
    context = {
      isOpen: true,
      activeItem: itemOne,
      handleCloseModal: jest.fn(),
    }
    render(
      <Context.Provider value={context}>
        <ModalComponent />
      </Context.Provider>
    );

    expect(screen.getByText('Rocket One')).toBeInTheDocument();
  });
});
