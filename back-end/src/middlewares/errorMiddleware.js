const { DatabaseError } = require('sequelize');
const { JsonWebTokenError } = require('jsonwebtoken');
const MainError = require('../errors/MainError');

const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  switch (true) {
    case err instanceof MainError:
      return res.status(err.status).json({
        message: err.message,
      });
    case err instanceof DatabaseError:
      return res.status(400).json({ message: 'userId or sellerId invalid' });
    case err instanceof JsonWebTokenError:
      return res.status(401).json({ message: 'Token must be a valid token' });
    default:
      return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = errorMiddleware;
