const sellerService = require('../services/sellerService');

const findAll = async (_req, res) => {
  const sellers = await sellerService.findAll();
  return res.status(200).json(sellers);
};

module.exports = { findAll };
