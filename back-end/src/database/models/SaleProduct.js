/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "salesProducts",
      underscored: true,
    }
  );

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: SaleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
    });

    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: SaleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  };

  return SaleProduct;
};
