import { validate } from 'express-validation'

import * as validator from '../controllers/suspend/validator'
import * as controller from '../controllers/suspend/controller'

module.exports = {
  post: [
    { path: '', controller: controller.suspend, validator: validate(validator.suspend, { keyByField: true }) }
  ]
}