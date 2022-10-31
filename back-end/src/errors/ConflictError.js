const MainError = require("./MainError");

class ConflictError extends MainError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = ConflictError;
