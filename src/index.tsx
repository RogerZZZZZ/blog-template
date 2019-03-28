import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { StoreContext } from 'redux-react-hook'

import App from './App'
import { loginEpics, postEpics, userEpics } from './epics'
import reduxPersist from './redux-persist'

declare global {
  interface IWindow {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => {}
  }
}

const store = reduxPersist.getStore()
const persistor = reduxPersist.getPersistor()
const logEpicMiddleware = reduxPersist.getLogEpic()
const postEpicMiddleware = reduxPersist.getPostEpic()
const userEpicMiddleware = reduxPersist.getUserEpic()

logEpicMiddleware.run(loginEpics)
postEpicMiddleware.run(postEpics)
userEpicMiddleware.run(userEpics)

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </StoreContext.Provider>,
  document.getElementById('root'))
