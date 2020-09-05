import React from 'react';
import { render, screen } from '@testing-library/react';

import { dataRockets } from '../fixtures.js';
import App from '../../components/App/App.js';
import Context from '../../context/context.js';
import List from '../../components/List/List.js';
import { Provider } from '../../context/provider.js';

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
