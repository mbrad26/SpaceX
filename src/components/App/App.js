import React, {
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import './App.css';
import List from '../List/List';
import Navbar from '../Navbar/Navbar';
import ModalComponent from '../Modal/Modal';
import axios from 'axios';

const Context = React.createContext(null);

const API_ENDPOINT = 'https://api.spacexdata.com/v3/';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case 'DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        loading: false,
        isError: true,
      }
    case 'SET_URL':
      return {
        ...state,
        url: `${API_ENDPOINT}${action.payload}`,
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      }
    default:
      throw new Error();
  }
};

const App = () => {
  const initialState = {
    data: [],
    loading: false,
    isError: false,
    url: '',
    isOpen: false,
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const isMounted = useRef(false);

  const fetchData = useCallback(async () => {
    console.log('Comp: B');
    dispatch({ type: 'DATA_LOADING' });

    try {
      const result = await axios.get(state.url);
      dispatch({
        type: 'DATA_SUCCESS',
        payload: result.data
      });
    } catch {
        dispatch({ type: 'DATA_ERROR' });
    }
  }, [state.url]);

  console.log('Comp: A');
  console.log('Comp A isOpen: ' + state.isOpen);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      fetchData();
    }
  }, [fetchData]);

  const handleClick = event => {
    dispatch({ type: 'SET_URL', payload: event.target.innerHTML });
  }

  const handleOpenModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  }

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  return (
    <Context.Provider value={{
        ...state,
        handleClick: handleClick,
        handleOpenModal: handleOpenModal,
        handleCloseModal: handleCloseModal,
      }}
      >
      <Navbar />
      <div className='container'>
        <div className='row justify-content-center'>
          <h2>
            “You want to wake up in the morning and think the future is going
            to be great - and that’s what being a spacefaring civilization is all
            about. It’s about believing in the future and thinking that the future
            will be better than the past. And I can’t think of anything more
            exciting than going out there and being among the stars.”
            -Elon Musk
          </h2>
        </div>

        {state.isError && <h3>Something is wrong ...</h3>}

        {state.loading ? <p>Loading ...</p> : <List />}

        {state.isOpen && <ModalComponent />}
      </div>
    </Context.Provider>
  )
};

export default App;
export { Context };
