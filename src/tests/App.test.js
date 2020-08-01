import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { Context } from '../components/App/App';
import List, { Item } from '../components/List/List';
import axios from 'axios';

jest.mock('axios');

const itemOne = {
  id: 1,
  flickr_images: [],
  rocket_name: 'Rocket One',
  description: 'This is Rocket One',
};

const itemTwo = {
  id: 2,
  flickr_images: [],
  rocket_name: 'Rocket Two',
  description: 'This is Rocket Two',
};

const dragon = {
  id: 1,
  flickr_images: [],
  name: 'Dragon 1',
  description: 'This is Dragon 1',
}

const dataRockets = [itemOne, itemTwo];

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
    expect(screen.getByText('Details')).toHaveAttribute('href', '#');
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

describe('List', () => {
  it('renders data', () => {
    const context = {
      data: dataRockets,
    }
  render(
      <Context.Provider value={context}>
        <List />
      </Context.Provider>
    );

    expect(screen.getByTestId('wrapper').children.length).toBe(2);
  });
});
