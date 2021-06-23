import { successResponse, errorResponse } from '../../helpers'
import * as Suspend from '../../services/suspend'

export const suspend = async (req, res) => {
  try {
    const service = new Suspend.Student(req.body)
    await service.call()
    return successResponse(req, res, {}, 204)
  } catch (error) {
    return errorResponse(req, res, error)
  }
}