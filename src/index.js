import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
// import {configureStore} from '@reduxjs/toolkit';
import {createStore} from 'redux';

// const store = configureStore();
const defaultState = {
  movies: new Set(),
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'add_like':
      state.movies.add(action.payload);
      return state;
    case 'del_like':
      state.movies.delete(action.payload);
      return state;
    default:
      return state;
  }
};
const store = createStore(reducer);
console.log('store :>> ', store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
