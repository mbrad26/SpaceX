import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import { Text, Loader, Button } from '@mrshmllw/smores-react';
import axios from 'axios';

const API_ENDPOINT = 'https://api.spacexdata.com/v3/';
const getUrl = query => `${API_ENDPOINT}${query}`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: true,
      }
    default:
      throw new Error();
  }
};

const App = () => {
  const initialState = { data: [], loading: false, error: false };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFetchData = async event => {
    dispatch({ type: 'DATA_LOADING' });

    try {
      const result = await axios.get(getUrl(event.target.value));
      dispatch({
        type: 'DATA_SUCCESS',
        payload: result.data
      });
      console.log(state.data);
    } catch {
      dispatch({ type: 'DATA_ERROR' });
    }
  }

  console.log('Comp: A');

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <Text tag='h1' typo='header'>Hello World</Text>
      <Loader height='20' />

      <br/>

      <button value='rockets' onClick={handleFetchData}>Rockets</button>
      <button value='dragons' onClick={handleFetchData}>Dragons</button>

      {state.error && <h3>Something went terribly wrong ...</h3>}
      
      {state.loading
        ? (<p>Loading ...</p>)
        : (
            <ul>{state.data.map(item =>
              <li key={item.id}>
                {item.flickr_images.map((url) => <img src={url} key={url} width='200'/>)}
              </li>)}
            </ul>
          )
        }
    </>
  )
};

export default App;
