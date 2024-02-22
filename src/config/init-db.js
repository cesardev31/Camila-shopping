const sequelize = require("./database");
const Role = require("../models/Roles");
const Sales = require("../models/Sales");
const Product = require("../models/Product");
const User = require("../models/User");
const productsData = require("../../products.json");

const initializeProducts = async () => {
  try {
    for (const product of productsData) {
      // Verificar si el producto ya existe
      const existingProduct = await Product.findByPk(product.id);
      if (!existingProduct) {
        await Product.create(product);
      }
    }
  } catch (error) {
    console.error("Error al inicializar productos:", error);
  }
};

async function authenticateDB() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error; // Lanzar error para evitar la ejecución de pasos siguientes si la autenticación falla.
  }
}

async function syncModel(model, modelName) {
  try {
    await model.sync({ force: false });
  } catch (error) {
    console.error(`Error al sincronizar el modelo ${modelName}:`, error);
    throw error;
  }
}

async function initializeProductsWrapper() {
  try {
    await initializeProducts();
  } catch (error) {
    console.error("Error durante la inicialización de productos:", error);
    throw error;
  }
}

function setupModelAssociations() {
  User.belongsTo(Role, { foreignKey: "rolesId" });
  Role.hasMany(User, { foreignKey: "rolesId" });

  Sales.belongsTo(User, { foreignKey: "usersId" });
  User.hasMany(Sales, { foreignKey: "usersId" });

  Sales.belongsTo(Product, { foreignKey: "productsId" });
  Product.hasMany(Sales, { foreignKey: "productsId" });
}

const initDB = async () => {
  try {
    await authenticateDB();
    await syncModel(Role, "Role");
    await syncModel(User, "User");
    setupModelAssociations();
    await syncModel(Product, "Product");
    await initializeProductsWrapper();
    await syncModel(Sales, "Sales");
    console.log("se inicio correctamente la base de datos ");
  } catch (error) {
    console.error("La inicialización de la base de datos falló:", error);
  }
};

module.exports = initDB;
