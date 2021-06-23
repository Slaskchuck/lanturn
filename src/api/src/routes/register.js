import { validate } from 'express-validation'

import * as validator from '../controllers/register/validator'
import * as controller from '../controllers/register/controller'

module.exports = {
  post: [
    { path: '', controller: controller.register, validator: validate(validator.register, { keyByField: true }) }
  ]
}