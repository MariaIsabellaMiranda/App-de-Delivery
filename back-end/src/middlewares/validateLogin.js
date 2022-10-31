const BadRequestError = require('../errors/BadRequestError');
const validateLoginJOI = require('../schemas/validateLoginJOI');

const validateLogin = (req, _res, next) => {
  const { error } = validateLoginJOI(req.body);
  if (error) throw new BadRequestError(error.message);
  return next();
};

module.exports = validateLogin;
