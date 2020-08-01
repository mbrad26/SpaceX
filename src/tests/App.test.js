import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { Context } from '../components/App/App';
import { Item } from '../components/List/List';

const itemOne = {
  id: 1,
  flickr_images: [],
  rocket_name: 'Rocket One',
  description: 'This is Rocket One'
}

describe('Item', () => {
  it('renders all properties', () => {
    const context = {
      handleOpenModal: jest.fn(),
    }
    render(
      <Context.Provider value={context}>
        <Item item={itemOne} />
      </Context.Provider>
    );

    expect(screen.getByText(itemOne.rocket_name)).toBeInTheDocument();
    expect(screen.getByText(itemOne.description)).toBeInTheDocument();
    expect(screen.getByText('Details')).toHaveAttribute('href', '#');
  });

  it('opens a modal', () => {
    const context = {
      handleOpenModal: jest.fn(),
    }
    render(
      <Context.Provider value={context}>
        <Item item={itemOne}/>
      </Context.Provider>
    );
    const link = screen.getByText('Details');

    fireEvent.click(link);

    expect(context.handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
