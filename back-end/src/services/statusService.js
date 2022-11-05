const { Sale } = require('../database/models');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getOrder = async (id) => {
  const order = await Sale.findOne({ where: { id }, raw: true });
  return order;
};

const update = async (id, saleId, status) => {
  const order = await getOrder(saleId);

  if (!order) throw new NotFoundError('Order Not Found');
  if (order.userId !== id && order.sellerId !== id) {
    throw new UnauthorizedError('Unauthorized update');
  }
  
  await Sale.update({ status }, { where: { id: saleId } });

  const { status: newStatus } = await getOrder(saleId);

  return newStatus;
};

module.exports = { update };
