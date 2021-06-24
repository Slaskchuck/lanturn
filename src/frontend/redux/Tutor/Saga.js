import { put } from 'redux-saga/effects'

import TutorAction from './Action'

import Gateway from '../Api'

export function* getCommonStudents({ data: { tutors = [] } }) {
  try {
    yield put({ type: 'ERROR_CLEAR' })
    
    const params = new URLSearchParams()

    tutors.map(tutor => params.append('tutor', tutor))

    const { data } = yield Gateway.api.get(
      Gateway.routes.getcommonsstudents.base(),
      {
        params: params
      }
    )

    yield put(TutorAction.commonStudentListSuccess(data))
  } catch (err) {
    if (err.isAxiosError && err.response) {
      if (err.response.data.message === 'Validation Failed') {        
        yield put(TutorAction.commonStudentListFailure({ message: err.response.data.details.map(detail => Object.values(detail)) }))
      }
    }
  }
}