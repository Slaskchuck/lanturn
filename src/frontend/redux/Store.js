import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import Reducer from 'redux/Reducer'
import Saga from 'redux/Saga'

const bindMiddleWare = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    const composeEnchancers = composeWithDevTools({ trace: true })
    return composeEnchancers(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

export const initializeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    Reducer.reducer,
    bindMiddleWare([ sagaMiddleware ])
  )

  store.sagaTask = sagaMiddleware.run(Saga)

  return store
}

export const wrapper = createWrapper(initializeStore, { debug: true })