const BadRequestError = require('../errors/BadRequestError');
const validateRegisterJOI = require('../schemas/validateRegisterJOI');

const validateRegister = (req, _res, next) => {
  const { error } = validateRegisterJOI(req.body);
  if (error) throw new BadRequestError(error.message);
  return next();
};

module.exports = validateRegister;
