const jwt = require('../helpers/jwt');
const NotFoundError = require('../errors/NotFoundError');

const tokenMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new NotFoundError('Token not found');
  const decoded = jwt.validateAccessToken(token);
  res.locals.user = decoded;
  req.userId = decoded.id;
  next();
};

module.exports = tokenMiddleware;
