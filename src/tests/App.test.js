import React from 'react';
import { render, screen } from '@testing-library/react';
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

    expect(screen.getAllByText(/rocket one/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/rocket one/i)[1]).toBeInTheDocument();
    expect(screen.getAllByText(itemOne.description)[0]).toBeInTheDocument();
    expect(screen.getByText('Details')).toHaveAttribute('href', '#');
    screen.debug();
  });

});
