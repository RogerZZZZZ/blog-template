import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreContext } from 'redux-react-hook'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux'
import { ActionType } from 'typesafe-actions';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import * as logActions from './actions/login'
import reducers, { RootState } from './reducers'
import epics from './epics'

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
