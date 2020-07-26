import React, { useEffect, useReducer, useCallback, useRef } from 'react';
import './App.css';
import axios from 'axios';

const API_ENDPOINT = 'https://api.spacexdata.com/v3/';
const getUrl = query => `${API_ENDPOINT}${query}`;

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
        isError: false,
        data: action.payload,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        loading: false,
        isError: true,
      }
    default:
      throw new Error();
  }
};

const App = () => {
  const initialState = { data: [], loading: false, isError: false };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const isMounted = useRef(false);

  const handleFetchData = useCallback(async event => {
    dispatch({ type: 'DATA_LOADING' });

    try {
      const url = getUrl(event.target.value);
      const result = await axios.get(url);
      dispatch({
        type: 'DATA_SUCCESS',
        payload: result.data
      });
      console.log(state.data);
    } catch {
        dispatch({ type: 'DATA_ERROR' });
    }
  }, []);

  console.log('Comp: A');

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      handleFetchData();
    }
  }, []);

  return (
    <>
      <h1>Hello World</h1>

      <button value='rockets' onClick={handleFetchData}>Rockets</button>
      <button value='dragons' onClick={handleFetchData}>Dragons</button>

      {state.isError && <h3>Something is wrong ...</h3>}

      {state.loading && <p>Loading ...</p>}

      {state.data &&
        <ul>{state.data.map(item =>
          <li key={item.id}>
            {item.flickr_images.map((url) => <img src={url} key={url} width='200'/>)}
          </li>)}
        </ul>
      }
    </>
  )
};

export default App;
