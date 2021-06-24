import { HYDRATE } from 'next-redux-wrapper'

import ActionType from './ActionType'

const initialState = {
  commonStudents: []
}

export default {
  initialState,
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload }
      case ActionType.COMMON_STUDENT_LIST_SUCCESS:
        return { ...state, commonStudents: action.data.students }
      default:
        return state
    }
  }
}