const BadRequestError = require('../errors/BadRequestError');
const validateAdminRegisterJOI = require('../schemas/validateAdminRegisterJOI');

const validateRegister = (req, _res, next) => {
  const { error } = validateAdminRegisterJOI(req.body);
  if (error) throw new BadRequestError(error.message);
  return next();
};

module.exports = validateRegister;
