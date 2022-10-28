'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
    sale_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'sales',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      // field: 'sale_id'
    },
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      // field: 'product_id'
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  });
},

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('salesProducts');
  }
};