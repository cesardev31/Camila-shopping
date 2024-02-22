const productService = require("../../service/productService");
const { checkPermissions } = require("../middleware/permissionRole");

exports.createProduct = async (req, res, next) => {
  try {
    if (!(await checkPermissions(req, "createProduct"))) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
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
