import React from 'react';
import { render, screen, fireEvent, act, waitForElement } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App, { Context, dataReducer } from '../components/App/App';
import List, { Item } from '../components/List/List';
import ModalComponent from '../components/Modal/Modal';
import Images from '../components/Modal/Images.js';
import axios from 'axios';

jest.mock('axios');

const rocket = {
  "id": 2,
  "active": true,
  "stages": 2,
  "boosters": 0,
  "cost_per_launch": 50000000,
  "success_rate_pct": 97,
  "first_flight": "2010-06-04",
  "country": "United States",
  "company": "SpaceX",
  "height": {
    "meters": 70,
    "feet": 229.6
  },
  "diameter": {
    "meters": 3.7,
    "feet": 12
  },
  flickr_images: [],
  "mass": {
  },
  "payload_weights": [
  ],
  "first_stage": {
  },
  "second_stage": {

    },
    "payloads": {
  },
  "engines": {
    "number": 9,
    "type": "merlin",
    "version": "1D+",
    "layout": "octaweb",
    "engine_loss_max": 2,
    "propellant_1": "liquid oxygen",
    "propellant_2": "RP-1 kerosene",
    "thrust_sea_level": {
      "kN": 845,
      "lbf": 190000
    },
    "thrust_vacuum": {
      "kN": 914,
      "lbf": 205500
    },
    "thrust_to_weight": 180.1
  },
  "landing_legs": {
    "number": 4,
    "material": "carbon fiber"
  },
  "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9",
  "description": "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
  "rocket_id": "falcon9",
  "rocket_name": "Falcon 9",
  "rocket_type": "rocket"
}

const itemOne = {
  id: 1,
  flickr_images: ['url1', 'url2'],
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

describe('Images', () => {
  it('renders all the images', () => {
    render(<Images activeItem={itemOne} />);

    expect(screen.getAllByRole('img').length).toBe(2);
    screen.debug();
  });
});

describe('App', () => {
  describe('handleCloseModal', () => {
    it('closes a modal', async () => {
      const dispatch = jest.fn();
      const context = {
        handleCloseModal: jest.fn(),
        activeItem: rocket,
        isOpen: true,
      }
      render(
          <Context.Provider value={context}>
            {context.isOpen && <ModalComponent />}
          </Context.Provider>
      )
      // screen.debug();

      fireEvent.click(screen.getAllByRole('button', { name: 'Close' })[1]);

      // expect(dispatch).toHaveBeenCalledTimes(1);
      // expect(dispatch).toHaveBeenCalledWith({ type:  'CLOSE_MODAL' });
    });
  });

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
