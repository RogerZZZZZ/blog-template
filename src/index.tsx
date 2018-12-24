import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreContext } from 'redux-react-hook'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux'
import { ActionType } from 'typesafe-actions';

import * as logActions from './actions/login'
import reducers, { IRootState } from './reducers'
import epics from './epics'

declare global {
  interface IWindow {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => {};
  }
}

type LogActions = ActionType<typeof logActions>
const logEpicMiddleware = createEpicMiddleware<LogActions, LogActions, IRootState>()

const configStore = (initState?: IRootState) => {
  const middlewares = [
    logEpicMiddleware,
  ]

  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  return createStore(
    reducers,
    initState,
    enhancer,
  )
}

const store = configStore()

logEpicMiddleware.run(epics)

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root'));
