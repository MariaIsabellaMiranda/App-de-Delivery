const { validateAccessToken } = require('../helpers/jwt');
const NotFoundError = require('../errors/NotFoundError');

const tokenMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new NotFoundError(404, 'NOT_FOUND', 'Token not found');
  const decoded = validateAccessToken(token);
  res.locals.user = decoded;
  next();
};

module.exports = tokenMiddleware;
