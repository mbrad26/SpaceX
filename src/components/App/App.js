import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import './App.css';
import List from '../List/List';
import axios from 'axios';

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
  const [url, setUrl] = useState();
  const isMounted = useRef(false);

  const handleClick = event =>
    setUrl(`${API_ENDPOINT}${event.target.value}`)

  const fetchData = useCallback(async () => {
    dispatch({ type: 'DATA_LOADING' });

    try {
      const result = await axios.get(url);
      dispatch({
        type: 'DATA_SUCCESS',
        payload: result.data
      });
    } catch {
        dispatch({ type: 'DATA_ERROR' });
    }
  }, [url]);

  console.log('Comp: A');

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      fetchData();
    }
  }, [fetchData]);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <h1>Hello World</h1>
      </div>

      <button value='rockets' onClick={handleClick}>Rockets</button>
      <button value='dragons' onClick={handleClick}>Dragons</button>

      {state.isError && <h3>Something is wrong ...</h3>}

      {state.loading
        ? <p>Loading ...</p>
        : <List data={state.data} />
      }
    </div>
  )
};

export default App;
