import { Joi } from 'express-validation'

export const retriveNotification = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    notification: Joi.string().required()
  })
}