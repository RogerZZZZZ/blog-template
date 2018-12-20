import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreContext } from 'redux-react-hook'
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root'));
