const Sale = require("../../models/Sales");

// Controlador para crear una venta
exports.createSale = async (req, res) => {
  try {
    const newSale = await Sale.create(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la venta", error });
  }
};

// Controlador para obtener todas las ventas
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las ventas", error });
  }
};

// Controlador para actualizar una venta
exports.updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la venta", error });
  }
};

// Controlador para eliminar una venta
exports.deleteSale = async (req, res) => {
  try {
    await Sale.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Venta eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la venta", error });
  }
};
