const customerService = require("../services/customerService");

const createSale = async (req, res) => {
  const { id: userId } = res.locals.user;
  const sellerId = await customerService.createSale({ ...req.body, userId });
  res.status(201).json(sellerId);
};

module.exports = { createSale };
