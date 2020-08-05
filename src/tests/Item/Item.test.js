import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Context from '../../context/context';
import Provider from '../../context/provider';
import ModalComponent from '../../components/Modal/Modal.js';
import { itemOne, dragon } from '../fixtures';
import Item from '../../components/Item/Item';

describe('Item', () => {
  let context;

  beforeEach(() => {
    context = {
      handleOpenModal: jest.fn(),
    }
    render(
      <Provider value={context}>
        <Item item={itemOne}/>
      </Provider>
    );
  });

  afterEach(cleanup);

  it('renders snapshot', () => {
    const { container } = render(
      <Provider>
        <Item item={itemOne}/>
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders all properties', () => {
    expect(screen.getByText(itemOne.rocket_name)).toBeInTheDocument();
    expect(screen.getByText(itemOne.description)).toBeInTheDocument();
  });

  it('renders dragons', () => {
    render(
      <Provider>
        <Item item={dragon} />
      </Provider>
    );

    expect(screen.getByText(dragon.name)).toBeInTheDocument();
  });

  it('opens a modal', () => {
    screen.debug();

    fireEvent.click(screen.getByText('Details'));

    render(
      <Provider>
        <ModalComponent />
      </Provider>
    );

    screen.debug();

    expect(context.handleOpenModal).toHaveBeenCalled();
    expect(context.handleOpenModal).toHaveBeenCalledWith(itemOne);
  });
});
