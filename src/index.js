import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Provider from './context/provider.js';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
