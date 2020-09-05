import React, { useReducer, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';

import Context from './context.js';
import { dataReducer } from './reducer.js';

const Provider = ({ children }) => {
  const initialState = {
    data: [],
    loading: false,
    isError: false,
    url: '',
    isOpen: false,
    activeItem: '',
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const isMounted = useRef(false);

  const fetchData = useCallback(async () => {
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

  const handleClick = event => {
    dispatch({ type: 'SET_URL', payload: event.target.innerHTML });
  }

  const handleOpenModal = item => {
    dispatch({ type: 'OPEN_MODAL', payload: item});
  }

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      fetchData();
    }
  }, [fetchData]);

  return (
    <Context.Provider value={{
      ...state,
      handleClick: handleClick,
      handleOpenModal: handleOpenModal,
      handleCloseModal: handleCloseModal,
    }}
    >
      {children}
    </Context.Provider>
  )
}

export { Provider };
