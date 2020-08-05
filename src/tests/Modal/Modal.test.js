import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { itemOne, dragon } from '../fixtures';
import Context from '../../context/context';
import Provider from '../../context/provider';
import ModalComponent from '../../components/Modal/Modal';

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
