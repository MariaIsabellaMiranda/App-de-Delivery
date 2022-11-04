const productsService = require('../services/productsService');

const findAll = async (_req, res) => {
  const products = await productsService.findAll();
  return res.status(200).json(products);
};

module.exports = { findAll };
