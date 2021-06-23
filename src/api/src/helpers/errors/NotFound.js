import BaseError from "./BaseError";

export default class NotFound extends BaseError {
  constructor(details) {
    super(
      'Resource Not Found',
      404,
      details
    )
  }
}