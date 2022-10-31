const { Product } = require('../database/models');

const findAll = async () => {
  return Product.findAll();
};

module.exports = { findAll };
