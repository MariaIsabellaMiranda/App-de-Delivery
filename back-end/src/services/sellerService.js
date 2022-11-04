const { User, Sale, Product } = require('../database/models');
const NotFoundError = require('../errors/NotFoundError');

const findAll = async () => User.findAll({
  where: { role: 'seller' },
  attributes: {
    exclude: ['password'],
  },
});

const getOrders = async (sellerId) => {
  const orders = Sale.findAll({
  where: { sellerId },
  attributes: {
    exclude: ['userId', 'sellerId'],
  },
});
return orders;
};

const getOrder = async (sellerId, orderId) => {
const order = await Sale.findOne({
  where: { id: orderId, sellerId },
  raw: true,
  include: [{
    model: Product,
    as: 'products',
    through: { attributes: ['quantity'] },
  },
],
});
if (!order) throw new NotFoundError('order Not Found');
return order;
};

module.exports = { findAll, getOrders, getOrder };
