const sequelize = require("./database");
const Role = require("../models/Roles");
const Sales = require("../models/Sales");
const Product = require("../models/Product");
const User = require("../models/User");

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente.");

    // Sincroniza el modelo Role explícitamente
    await Role.sync({ force: false });
    console.log("Modelo Role sincronizado exitosamente.");

    // Sincroniza el modelo User explícitamente
    await User.sync({ force: false });
    console.log("Modelo User sincronizado exitosamente.");

    // Sincroniza el modelo Product explícitamente
    await Product.sync({ force: false });
    console.log("Modelo Product sincronizado exitosamente.");

    // Sincroniza el modelo Sales explícitamente
    await Sales.sync({ force: false });
    console.log("Modelo Sales sincronizado exitosamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

module.exports = initDB;
