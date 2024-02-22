const Product = require("../models/product");

const createProduct = async (productData) => {
  // Aquí podrías añadir lógica de negocio antes de crear el producto
  return await Product.create(productData);
};

const listProducts = async () => {
  // Aquí podrías añadir lógica de negocio antes de devolver los productos
  return await Product.findAll();
};

module.exports = {
  createProduct,
  listProducts,
};
