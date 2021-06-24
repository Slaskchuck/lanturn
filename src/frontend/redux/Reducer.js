import { combineReducers } from 'redux'

import TutorReducer from './Tutor/Reducer'

import ErrorReducer from './ErrorReducer'

const initialState = {
  tutor: TutorReducer.initialState,
  error: ErrorReducer.initialState
}

export default {
  initialState,
  reducer: combineReducers({
    tutor: TutorReducer.reducer,
    error: ErrorReducer.reducer
  })
}