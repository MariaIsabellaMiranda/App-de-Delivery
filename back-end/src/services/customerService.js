const { Sequelize } = require('sequelize');
const config = require('../database/config/config');
const { Sale, SaleProduct, Product } = require('../database/models');

const sequelize = new Sequelize(config.development);

const createSale = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  products,
}) => {
  const newSale = await sequelize.transaction(async (t) => {
    const { id } = await Sale.create({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente',
    }, { transaction: t });

    const salesProducts = products.map((product) => (
      { saleId: id, productId: product.id, quantity: product.quantity }
    ));

    await SaleProduct.bulkCreate(salesProducts, { transaction: t });

    return { id };
  });

  return newSale;
};

const getOrders = async (userId) => {
  return Sale.findAll({
    where: { userId },
    attributes: {
      exclude: ['deliveryAddress', 'deliveryNumber', 'sellerId'],
    },
  });
};

const getOrder = async (userId, orderId) => {
  const order = await Sale.findOne({
    where: { id: orderId, userId },
    include: {
      model: Product,
      as: 'products',
      through: { attributes: ['quantity'] },
    }
  });
  return order;
};

module.exports = { createSale, getOrder, getOrders };
