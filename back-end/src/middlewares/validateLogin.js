const BadRequestError = require('../errors/BadRequestError');
const validateLoginJOI = require('../schemas/validateLoginJOI');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = validateLoginJOI({ email, password });
  if (error) throw new BadRequestError(error.message);
  return next();
};

module.exports = validateLogin;
