import { successResponse, errorResponse } from '../../helpers'
import * as Register from '../../services/register'

export const register = async (req, res) => {
  try {
    const service = new Register.Student(req.body)
    await service.call()
    return successResponse(req, res, {}, 204)
  } catch (error) {
    return errorResponse(req, res, error)
  }
}