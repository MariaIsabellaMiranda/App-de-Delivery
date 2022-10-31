/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "sales",
      undescore: true,
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

    Sale.belongsTo(models.User, {
      foreignKey: "sellerId",
      as: "seller",
    });
  };

  return Sale;
};
