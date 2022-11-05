const BadRequestError = require('../errors/BadRequestError');
const validateStatusJOI = require('../schemas/validateStatus.JOI');

const validateStatus = (req, _res, next) => {
  const { error } = validateStatusJOI(req.body);
  if (error) throw new BadRequestError(error.message);
  return next();
};

module.exports = validateStatus;
