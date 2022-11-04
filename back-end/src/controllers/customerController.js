const customerService = require('../services/customerService');

const createSale = async (req, res) => {
  const { id: userId } = res.locals.user;
  const sellerId = await customerService.createSale({ ...req.body, userId });
  res.status(201).json(sellerId);
};

const getOrders = async (_req, res) => {
  const { id: userId } = res.locals.user;
  const orders = await customerService.getOrders(userId);
  return res.status(200).json(orders);
};

const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { id: userId } = res.locals.user;
  const order = await customerService.getOrder(userId, orderId);
  return res.status(200).json(order);
};

module.exports = { createSale, getOrders, getOrder };
