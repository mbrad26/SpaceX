import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App, { Context, dataReducer } from '../components/App/App';
import List, { Item } from '../components/List/List';
import axios from 'axios';

jest.mock('axios');

afterEach(cleanup);

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
const path =  "https://api.spacexdata.com/v3/"
const endPoint = 'rockets';

describe('App', () => {

  describe('fetchData', () => {
    it('fetches data', async () => {
      const result = Promise.resolve({
          data: dataRockets,
      });
      axios.get.mockImplementationOnce(() => result);

      render(<App />)

      expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();

      const rockets = screen.getByText('ROCKETS');
      fireEvent.click(rockets);
      // userEvent.click(rockets);

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
      screen.debug();
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
  });
});

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
    const container = render(
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
