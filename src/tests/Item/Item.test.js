import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Context } from '../../components/App/App';
import { itemOne, dragon } from '../fixtures';
import Item from '../../components/Item/Item';

describe('Item', () => {
  let context;

  beforeEach(() => {
    context = {
      handleOpenModal: jest.fn(),
    }
    render(
      <Context.Provider value={context}>
        <Item item={itemOne}/>
      </Context.Provider>
    );
  });

  it('renders snapshot', () => {
    const { container } = render(
      <Context.Provider value={context}>
        <Item item={itemOne}/>
      </Context.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders all properties', () => {
    expect(screen.getByText(itemOne.rocket_name)).toBeInTheDocument();
    expect(screen.getByText(itemOne.description)).toBeInTheDocument();
  });

  it('renders dragons', () => {
    render(
      <Context.Provider value={context}>
        <Item item={dragon} />
      </Context.Provider>
    );

    expect(screen.getByText(dragon.name)).toBeInTheDocument();
  });

  it('opens a modal', () => {
    const link = screen.getByText('Details');

    fireEvent.click(link);

    expect(context.handleOpenModal).toHaveBeenCalledTimes(1);
    expect(context.handleOpenModal).toHaveBeenCalledWith(itemOne);
  });
});
