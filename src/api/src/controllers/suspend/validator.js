import { Joi } from 'express-validation'

export const suspend = {
  body: Joi.object({
    student: Joi.string().email().required()
  })
}