class MainError extends Error {
  status;
  constructor(message) {
    super(message);
  }
}

module.exports = MainError;
