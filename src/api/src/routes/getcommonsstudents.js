import { validate } from 'express-validation'

import * as validator from '../controllers/getcommonsstudents/validator'
import * as controller from '../controllers/getcommonsstudents/controller'

module.exports = {
  get: [
    { path: '', controller: controller.getCommonStudents, validator: validate(validator.getCommonStudents, { keyByField: true }) }
  ]
}