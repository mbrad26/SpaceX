import React, { useContext } from 'react';
import Button from "react-bootstrap/Button";
import { render, screen, act, fireEvent } from '@testing-library/react';
import axios from 'axios';

import App from '../components/App/App.js';
import Context from '../context/context.js';
import Item from '../components/Item/Item.js';
import { Provider } from '../context/provider.js';
import Images from '../components/Modal/Images.js';
import { dataReducer } from '../context/reducer.js';
import ModalComponent from '../components/Modal/Modal.js';
import { itemOne, itemTwo, dragon, dataRockets } from './fixtures.js';

jest.mock('axios');

const path =  "https://api.spacexdata.com/v3/"
const endPoint = 'rockets';

describe('#handleCloseModal', () => {
  it('closes a modal', async () => {
    const TestComponent = () => {
      const { isOpen, handleCloseModal, activeItem } = useContext(Context);

      return (
        <Button onClick={handleCloseModal}>Close</Button>
      )
    }
    render(
      <Provider>
          <TestComponent />
      </Provider>
    );

    expect(fireEvent.click(screen.getByText('Close'))).toBeTruthy();
  });
});

describe('#fetchData', () => {
  it('fetches data', async () => {
    const result = Promise.resolve({
        data: dataRockets,
    });
    axios.get.mockImplementationOnce(() => result);
    render(
      <Provider>
        <App />
      </Provider>
    );

    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();

    const rockets = screen.getByText('ROCKETS');
    fireEvent.click(rockets);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    await act(() => result);

    expect(screen.queryByText(/Loading/)).toBeNull();
    expect(screen.getByText('Rocket One')).toBeInTheDocument();
    expect(screen.getByText('Rocket Two')).toBeInTheDocument();
    expect(screen.getByText(itemOne.description)).toBeInTheDocument();
    expect(screen.getByText(itemTwo.description)).toBeInTheDocument();
  });

  it('fails to fetch data', async () => {
    const reject = Promise.reject();
    axios.get.mockImplementationOnce(() => reject);
    render(
      <Provider>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText('ROCKETS'));

    expect(screen.queryByText('Loading ...')).toBeInTheDocument();

    try {
      await act(() => reject);
    } catch {
      expect(screen.queryByText('Something is wrong ...')).toBeInTheDocument();
      expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
    }
  });
});

describe('#dataReducer', () => {
  it('returns loading == true', () => {
    const action = { type: 'DATA_LOADING' };
    const state = {
      data: [],
      loading: false,
      isError: false,
    }

    const newState = dataReducer(state, action);
    const expectedState = { data: [], loading: true, isError: false}

    expect(newState).toStrictEqual(expectedState);
  });

  it('returns data on success', () => {
    const action = { type: 'DATA_SUCCESS', payload: dataRockets }
    const state = {
      data: [],
      loading: true,
      isError: false
    }

    const newState = dataReducer(state, action);
    const expectedState = { data: dataRockets, loading: false, isError: false };

    expect(newState).toStrictEqual(expectedState);
  });

  it('returns isError on failure', () => {
    const action = { type: 'DATA_ERROR' }
    const state = {
      data: [],
      loading: true,
      isError: false
    }

    const newState = dataReducer(state, action);
    const expectedState = { data: [], loading: false, isError: true };

    expect(newState).toStrictEqual(expectedState);
  });

  it('sets URL', () => {
    const action = { type: 'SET_URL', payload:  endPoint }
    const state = {
      url: ''
    }

    const newState = dataReducer(state, action);
    const expectedState = { url: `${path}${endPoint}` };

    expect(newState).toStrictEqual(expectedState);
  });

  it('opens the modal', () => {
    const action = { type: 'OPEN_MODAL', payload:  itemOne }
    const state = {
      isOpen: false,
      activeItem: ''
    }

    const newState = dataReducer(state, action);
    const expectedState = { isOpen: true, activeItem: itemOne };

    expect(newState).toStrictEqual(expectedState);
  });

  it('closes the modal', () => {
    const action = { type: 'CLOSE_MODAL' }
    const state = {
      isOpen: true,
    }

    const newState = dataReducer(state, action);
    const expectedState = { isOpen: false };

    expect(newState).toStrictEqual(expectedState);
  });

  it('throws a new error', () => {
    const action = { type: '' };
    const state = {};

    expect(dataReducer(state, action)).toStrictEqual(state);
  });
});
