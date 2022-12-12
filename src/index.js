import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './reducer/reducer.js';
import App from './App/app';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('todoapps'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
