const Sale = require("../models/Sales");
const Product = require("../models/Product");
const { Op } = require("sequelize");

// Función auxiliar para obtener el nombre del producto por ID
const includeProductName = async (sales) => {
  for (const sale of sales) {
    const product = await Product.findByPk(sale.productsId);
    if (product) {
      sale.dataValues.productName = product.name;
    }
  }
  return sales;
};

exports.createSale = async (saleData) => {
  // Aquí puedes agregar validaciones o lógica adicional si es necesario
  return await Sale.create(saleData);
};

exports.getAllSales = async () => {
  const sales = await Sale.findAll();
  const salesWithProductName = await includeProductName(sales);
  return salesWithProductName;
};

exports.getSaleById = async (id) => {
  const sale = await Sale.findByPk(id);
  if (sale) {
    sale.dataValues.productName = (
      await Product.findByPk(sale.productsId)
    ).name;
  }
  return sale;
};

exports.updateSale = async (id, saleData) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error("Venta no encontrada");
  }
  return await sale.update(saleData);
};

exports.deleteSale = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error("Venta no encontrada");
  }
  return await sale.destroy();
};

exports.calculateTotalSalesForDay = async (date) => {
  const totalSales = await Sale.sum("qty", {
    where: {
      saleAt: {
        [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
      },
    },
  });
  return totalSales;
};

exports.calculateTotalSalesForMonth = async (month) => {
  const totalSales = await Sale.sum("qty", {
    where: {
      saleAt: {
        [Op.between]: [`${month}-01 00:00:00`, `${month}-31 23:59:59`],
      },
    },
  });
  return totalSales;
};
