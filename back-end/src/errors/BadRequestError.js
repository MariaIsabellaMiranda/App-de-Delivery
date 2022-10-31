const MainError = require('./MainError');

class BadRequestError extends MainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = BadRequestError;
