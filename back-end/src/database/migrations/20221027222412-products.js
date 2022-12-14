'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      foreignKey: true,
    },
    price: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
      foreignKey: true,
    },
    urlImage: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'url_image'
    }
  });
},

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};
