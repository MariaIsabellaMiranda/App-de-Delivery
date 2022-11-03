const customerService = require('../services/customerService');

const createSale = async (req, res) => {
  const salerId = await customerService.createSale(req.body);
  res.status(201).json(salerId);
};

module.exports = { createSale };