const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Sale extends Model {}

Sale.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productsId: {
      type: DataTypes.UUID,
      references: {
        model: "products",
        key: "id",
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saleAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usersId: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Sale",
  }
);

module.exports = Sale;
