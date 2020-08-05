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
        activeItem: action.payload,
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

export { dataReducer };
