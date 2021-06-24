import ActionType from './ActionType'

export default {
  commonStudentList: (data) => ({ type: ActionType.COMMON_STUDENT_LIST, data }),
  commonStudentListSuccess: (data) => ({ type: ActionType.COMMON_STUDENT_LIST_SUCCESS, data }),
  commonStudentListFailure: (data) => ({ type: ActionType.COMMON_STUDENT_LIST_FAILURE, data }),
}