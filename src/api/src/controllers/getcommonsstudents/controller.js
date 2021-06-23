import { successResponse, errorResponse } from '../../helpers'
import * as TutorStudent from '../../services/getCommonStudents'

export const getCommonStudents = async (req, res) => {
  try {
    const service = new TutorStudent.CommonStudent(req.query)
    const students = await service.call()
    return successResponse(req, res, { students }, 200)
  } catch (error) {
    return errorResponse(req, res, error)
  }
}