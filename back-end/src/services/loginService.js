const { User } = require('../database/models');

const login = async (email, password) => {
  const result = await User.findOne({ where: { email } });
  if (!result) return { message: 'User not Found!' };
  if (password !== result.password) return { message: 'Wrong Password!' };
  return result;
};

module.exports = { login };
