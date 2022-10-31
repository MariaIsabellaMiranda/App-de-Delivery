const MainError = require('../errors/MainError');
const { JsonWebTokenError } = require('jsonwebtoken');

const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof MainError) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: 'Token must be a valid token',
    });
  }

  return res.status(500).json({
    message: 'Internal Error',
  });
};

module.exports = errorMiddleware;
