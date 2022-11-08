const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const validateAdmin = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw new NotFoundError('User not found');
  if (user.role !== 'administrator') {
    throw new UnauthorizedError('This user is not an administrator');
  }
  return user;
};

const createUser = async (userData, adminId) => {
  const { name, email, password } = userData;
  await validateAdmin(adminId);
  const [user, created] = await User
    .findOrCreate({
      where: { [Op.or]: [{ email }, { name }] },
      defaults: { ...userData, password: md5(password) },
  });
  if (!created) throw new ConflictError('An user with that name or email already exists');
  const newUser = user.get({ plain: true });
  delete newUser.password;
  return newUser;
};

const getUsers = async (adminId) => {
  await validateAdmin(adminId);
  const users = User.findAll({
    where: { role: { [Op.not]: 'administrator' } },
    attributes: { exclude: ['password'] },
  });
  return users;
};

const deleteUser = async (userId, adminId) => {
  await validateAdmin(adminId);
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundError('User not found');
  await User.destroy({ where: { id: userId } });
  return 'user deleted';
};

module.exports = { getUsers, createUser, deleteUser };
