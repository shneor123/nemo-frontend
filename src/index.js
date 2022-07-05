import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './root-cmp';
import { Provider } from 'react-redux';
import { store } from './store/store'
import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


