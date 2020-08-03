import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { itemOne, itemTwo, dragon, dataRockets } from '../fixtures.js';
import App, { Context, dataReducer } from '../../components/App/App.js';
import ModalComponent from '../../components/Modal/Modal';
import Images from '../../components/Modal/Images.js';
import axios from 'axios';

jest.mock('axios');

const path =  "https://api.spacexdata.com/v3/"
const endPoint = 'rockets';

describe('App', () => {
  it('renders snapshot', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('#handleCloseModal', () => {
    it('closes a modal', async () => {
      const dispatch = jest.fn();
      const context = {
        handleCloseModal: jest.fn(),
        activeItem: itemOne,
        isOpen: true,
      }
      render(
          <Context.Provider value={context}>
            {context.isOpen && <ModalComponent />}
          </Context.Provider>
      )

      fireEvent.click(screen.getAllByRole('button', { name: 'Close' })[1]);
    });
  });

  describe('#fetchData', () => {
    it('fetches data', async () => {
      const result = Promise.resolve({
          data: dataRockets,
      });
      axios.get.mockImplementationOnce(() => result);

      render(<App />)

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
      render(<App />);

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

      expect(() => dataReducer(state, action)).toThrow(new Error());
    });
  });
});
