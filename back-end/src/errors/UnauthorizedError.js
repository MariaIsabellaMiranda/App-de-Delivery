const MainError = require('./MainError');

class UnauthorizedError extends MainError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
