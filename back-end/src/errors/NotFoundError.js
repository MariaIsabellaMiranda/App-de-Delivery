const MainError = require("./MainError");

class NotFoundError extends MainError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;
