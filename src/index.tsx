import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { StoreContext } from 'redux-react-hook';
import { ActionType } from 'typesafe-actions';

import * as logActions from './actions/login';
import App from './App';
import epics from './epics';
import reducers, { RootState } from './reducers';

declare global {
  interface IWindow {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => {};
  }
}

type LogActions = ActionType<typeof logActions>
const logEpicMiddleware = createEpicMiddleware<LogActions, LogActions, RootState>()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
}

const configStore = (initState?: RootState) => {
  const middlewares = [
    logEpicMiddleware,
  ]

  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  const persistedReducer = persistReducer(persistConfig, reducers)

  const createdStore = createStore(
    persistedReducer,
    initState,
    enhancer,
  )

  return { store: createdStore,  persistor: persistStore(createdStore)}
}

const { store, persistor } = configStore()

logEpicMiddleware.run(epics)

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </StoreContext.Provider>,
  document.getElementById('root'));
