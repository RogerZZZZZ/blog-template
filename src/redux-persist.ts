import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { Persistor, persistReducer, persistStore,  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ActionType } from 'typesafe-actions'

import * as logActions from '@actions/login'
import * as postActions from '@actions/post'
import reducers, { RootState } from './reducers'

type LogActions = ActionType<typeof logActions>
const logEpicMiddleware = createEpicMiddleware<LogActions, LogActions, RootState>()

type PostActions = ActionType<typeof postActions>
const postEpicMiddleware = createEpicMiddleware<PostActions, PostActions, RootState>()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'post'],
}

const configStore = (initState?: RootState) => {
  const middlewares = [
    logEpicMiddleware,
    postEpicMiddleware,
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

class ReduxPersist {
  private readonly persistor: Persistor
  private readonly store: any
  private readonly logEpicMiddleware: any
  private readonly postEpicMiddleware: any

  constructor() {
    const { store, persistor } = configStore()
    this.persistor = persistor
    this.store = store
    this.logEpicMiddleware = logEpicMiddleware
    this.postEpicMiddleware = postEpicMiddleware
  }

  public getPersistor() {
    return this.persistor
  }

  public getStore() {
    return this.store
  }

  public getLogEpic() {
    return this.logEpicMiddleware
  }

  public getPostEpic() {
    return this.postEpicMiddleware
  }
}

export default new ReduxPersist()