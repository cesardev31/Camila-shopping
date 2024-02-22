const SaleService = require("../../service/saleService");

exports.dailyClosing = async (req, res) => {
  try {
    const totalSalesValue = await SaleService.calculateTotalSalesForDay(
      req.params.date
    );
    res.status(200).json({ totalSalesValue });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al hacer el cierre diario de ventas",
        error: error.message,
      });
  }
};

exports.monthlyBalance = async (req, res) => {
  try {
    const totalSalesValue = await SaleService.calculateTotalSalesForMonth(
      req.params.month
    );
    res.status(200).json({ totalSalesValue });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al hacer el balance mensual",
        error: error.message,
      });
  }
};
