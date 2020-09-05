import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import Context from '../../context/context.js';
import { itemOne, dragon } from '../fixtures.js';
import Item from '../../components/Item/Item.js';
import { Provider } from '../../context/provider.js';
import ModalComponent from '../../components/Modal/Modal.js';

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
});
