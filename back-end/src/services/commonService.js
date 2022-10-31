const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { createAccessToken } = require('../helpers/jwt');

const validateNewUser = async ({ email, name }) => {
  const user = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });
  if (user) throw new ConflictError('User with that credentials already exists');
  return 'User data is valid';
};

const login = async ({ email, password }) => {
  const passCrypt = md5(password);
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) throw new NotFoundError('Not found');
  if (user.password !== passCrypt) throw new BadRequestError('Invalid credentials');
  const token = createAccessToken(user.id);
  delete user.id;
  delete user.password;
  return { ...user, token };
};

const register = async (newUserDto) => {
  const { name, password, email } = newUserDto;
  await validateNewUser({ name, email });
  const userData = await User.create({ ...newUserDto, role: 'customer' });
  const user = userData.get({ plain: true });
  const token = createAccessToken(user.id);
  delete user.id;
  delete user.password;
  return { ...user, token, password: md5(password) };
};

module.exports = { login, register };
