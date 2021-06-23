import { validate } from 'express-validation'

import * as validator from '../controllers/retrievenotifications/validator'
import * as controller from '../controllers/retrievenotifications/controller'

module.exports = {
  post: [
    { path: '', controller: controller.retriveNotification, validator: validate(validator.retriveNotification, { keyByField: true }) }
  ]
}