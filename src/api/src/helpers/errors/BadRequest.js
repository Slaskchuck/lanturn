import BaseError from './BaseError'

export default class BadRequest extends BaseError {
  constructor(message, details) {
    super(message, 400, details)
  }
}