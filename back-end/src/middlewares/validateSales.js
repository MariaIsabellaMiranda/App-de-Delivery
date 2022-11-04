const BadRequestError = require('../errors/BadRequestError');
const validateSalesJOI = require('../schemas/validateSalesJOI');

const validateSales = (req, _res, next) => {
  const { error } = validateSalesJOI(req.body);
  if (error) throw new BadRequestError(error.message);
  return next();
};

module.exports = validateSales;
