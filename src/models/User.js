const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    rolesId: {
      type: DataTypes.UUID,
      references: {
        model: "Roles", 
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
