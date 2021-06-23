import { Joi } from 'express-validation'

export const getCommonStudents = {
  query: Joi.object({
    tutor: Joi.alternatives(
      Joi.array().items(Joi.string().email()).min(1),
      Joi.string().email()
    ).required(),
  })
}