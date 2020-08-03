import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../components/App/App';
import List from '../../components/List/List';
import { itemOne, dataRockets } from '../fixtures';

describe('List', () => {
  let context;

  beforeEach(() => {
    context = {
      data: dataRockets,
    }
    render(
      <Context.Provider value={context}>
        <List />
      </Context.Provider>
    );
  });

  it('renders snapshot', () => {
    const { container } = render(
      <Context.Provider value={context}>
        <List />
      </Context.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders data', () => {
    expect(screen.getByTestId('wrapper').children.length).toBe(2);
  });
});
