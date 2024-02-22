const Product = require("../models/Product");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const listProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (productId) => {
  return await Product.findByPk(productId);
};

module.exports = {
  createProduct,
  listProducts,
  getProductById
};
