import React from 'react';
import { render } from '@testing-library/react';
import App from '../../components/App/App';
import Provider from '../../context/provider';

describe('App', () => {
  it('renders snapshot', () => {
    const { container } = render(
      <Provider>
        <App />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
