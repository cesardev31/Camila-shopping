const SaleService = require("../../service/saleService");
const ProductService = require("../../service/productService");
const UserService = require("../../service/userService");

const { checkPermissions } = require("../middleware/permissionRole");

exports.createSale = async (req, res) => {
  try {
    const { productsId, qty, usersId } = req.body;

    // Validación del ID de producto
    const product = await ProductService.getProductById(productsId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Validación del ID de usuario
    const user = await UserService.getUserById(usersId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validación de la cantidad
    if (!qty || qty <= 0) {
      return res.status(400).json({ message: "Cantidad inválida" });
    }

    // Crear la venta si todas las validaciones son correctas
    const saleData = { productsId, qty, usersId, saleAt: new Date() };
    const sale = await SaleService.createSale(saleData);
    res.status(201).json(sale);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la venta", error: error.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    if (!(await checkPermissions(req, "getAllSales"))) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    const sales = await SaleService.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las ventas", error: error.message });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    if (!(await checkPermissions(req, "updateSale"))) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    const updatedSale = await SaleService.updateSale(saleId, req.body);
    res.status(200).json(updatedSale);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la venta", error: error.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    if (!(await checkPermissions(req, "deleteSale"))) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    await SaleService.deleteSale(saleId);
    res.status(200).json({ message: "Venta eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la venta", error: error.message });
  }
};
