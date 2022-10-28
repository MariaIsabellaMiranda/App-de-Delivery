'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // field: 'user_id'
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // field: 'seller_id'
      },
      total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        // field: 'total_price'
      },
      delivery_address: {
        type: Sequelize.STRING,
        allowNull: false,
        // field: 'delivery_address'
      },
      delivery_number: {
        type: Sequelize.STRING,
        allowNull: false,
        // field: 'delivery_number'
      },
      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
        // field: 'sale_date'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};
