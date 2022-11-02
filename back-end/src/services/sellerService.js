const { User } = require('../database/models');

const findAll = async () => User.findAll({
  where: { role: 'seller' },
  exclude: ['password'],
});

module.exports = { findAll };
