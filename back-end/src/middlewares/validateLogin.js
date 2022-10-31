const validateLoginJOI = require('./schemas/validateLoginJOI');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = validateLoginJOI({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
};

module.exports = validateLogin;
