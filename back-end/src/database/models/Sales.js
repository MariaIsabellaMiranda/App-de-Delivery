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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      delivery_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      delivery_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sale_date: {
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
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

    Sale.belongsTo(models.User, {
      foreignKey: "seller_id",
      as: "seller",
    });
  };

  return Sale;
};
