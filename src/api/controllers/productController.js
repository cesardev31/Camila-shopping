const productService = require("../../service/productService");

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await productService.listProducts();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al listar los productos", error: error.message });
  }
};
