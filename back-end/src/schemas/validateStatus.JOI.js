const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().required(),
  status: Joi.string().required(),
});

const validateStatusJOI = (dataBody) => schema.validate(dataBody);

module.exports = validateStatusJOI;
