const sellerService = require('../services/sellerService');

const findAll = async (_req, res) => {
  const sellers = await sellerService.findAll();
  return res.status(200).json(sellers);
};

const getOrders = async (_req, res) => {
  const { id: sellerId } = res.locals.user;
  const orders = await sellerService.getOrders(sellerId);
  return res.status(200).json(orders);
};

const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { id: sellerId } = res.locals.user;
  const order = await sellerService.getOrder(sellerId, orderId);
  return res.status(200).json(order);
};

module.exports = { findAll, getOrders, getOrder };
