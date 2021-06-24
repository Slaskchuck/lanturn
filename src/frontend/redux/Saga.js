import { all, takeLatest } from 'redux-saga/effects'

import TutorActionType from './Tutor/ActionType'
import * as TutorSaga from './Tutor/Saga'

const tutor = [
  takeLatest(TutorActionType.COMMON_STUDENT_LIST, TutorSaga.getCommonStudents)
]

export default function* rootSaga() {
  yield all([
    ...tutor
  ])
}