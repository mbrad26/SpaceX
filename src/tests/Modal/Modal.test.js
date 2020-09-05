import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Context from '../../context/context.js';
import { itemOne, dragon } from '../fixtures.js';
import { Provider } from '../../context/provider.js';
import ModalComponent from '../../components/Modal/Modal.js';

describe('ModalComponent', () => {
  it('renders rockect snapshot', () => {
    const { container } = render(
      <Provider>
        <ModalComponent />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
