const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required().messages({
      'string.pattern.base': 'Invalid email!',
    }),
  password: Joi.string().min(6).required(),
});

const validateLoginJOI = (dataBody) => schema.validate(dataBody);

module.exports = validateLoginJOI;
