import { successResponse, errorResponse } from '../../helpers'
import * as RetrieveNotifications from '../../services/retrievenotifications'

export const retriveNotification = async (req, res) => {
  try {
    const service = new RetrieveNotifications.Student(req.body)
    const recipients = await service.call()
    return successResponse(req, res, { recipients }, 200)
  } catch (error) {
    return errorResponse(req, res, error)
  }
}