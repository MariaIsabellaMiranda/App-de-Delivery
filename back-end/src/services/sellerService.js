const { User } = require('../database/models');

const findAll = async () => User.findAll({
  where: { role: 'seller' },
  attributes: {
    exclude: ['password'],
  },
});

module.exports = { findAll };
