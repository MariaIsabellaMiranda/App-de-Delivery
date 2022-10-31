const { Product } = require('../database/models');

const findAll = async () => Product.findAll();

module.exports = { findAll };
