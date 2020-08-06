import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from '../../context/context';
import { Provider } from '../../context/provider';
import List from '../../components/List/List';
import App from '../../components/App/App.js';
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
});
