const md5 = require('md5');
const { User } = require('../database/models');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { createAccessToken } = require('../helpers/jwt');

const login = async ({ email, password }) => {
  const passCrypt = md5(password);
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) throw new NotFoundError('Not found');
  if (user.password !== passCrypt) throw new BadRequestError('Invalid credentials');
  const token = createAccessToken(user.id);
  return { ...user, token };
};

module.exports = { login };
