import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from '../../context/context';
import Provider from '../../context/provider';
import List from '../../components/List/List';
import { dataRockets } from '../fixtures';

describe('List', () => {
  it('renders snapshot', () => {
    const { container } = render(
      <Provider>
        <List />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders data', () => {
    const context = {
      data: dataRockets,
    }
    render(
      <Provider value={context}>
        <List />
      </Provider>
    );

    screen.debug();

    expect(screen.getByTestId('wrapper').children.length).toBe(2);
  });
});
