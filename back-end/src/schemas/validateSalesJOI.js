const Joi = require('joi');

const schema = Joi.object({
  // userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  products: Joi.array().required(),
});

const validateSalesJOI = (dataBody) => schema.validate(dataBody);

module.exports = validateSalesJOI;
