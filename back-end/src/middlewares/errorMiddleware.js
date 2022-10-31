const MainError = require('../errors/MainError');
const { JsonWebTokenError } = require('jsonwebtoken');

const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);

  switch(true) {
    case err instanceof MainError:
      return res.status(err.status).json({
        message: err.message
      });
    case err instanceof JsonWebTokenError:
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    default:
      return res.status(500).json({
        message: 'Internal Error',
      });
  }
};

module.exports = errorMiddleware;
