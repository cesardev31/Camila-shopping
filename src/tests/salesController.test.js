const request = require("supertest");
const app = require("../app");
const SaleService = require("../service/saleService");
const ProductService = require("../service/productService");
const UserService = require("../service/userService");

// Mock the external services
jest.mock("../service/saleService");
jest.mock("../service/productService");
jest.mock("../service/userService");
jest.mock("../api/middleware/permissionRole", () => ({
  checkPermissions: () => (req, res, next) => next(),
}));

describe("POST /sales", () => {
  it("should create a new sale and return 201 status code", async () => {
    const newSaleData = {
      productsId: "some-product-id",
      qty: 5,
      usersId: "some-user-id",
    };

    const saleDate = new Date();
    const createdSale = {
      ...newSaleData,
      id: "some-sale-id",
      saleAt: saleDate,
    };

    ProductService.getProductById.mockResolvedValue({
      id: "some-product-id",
      name: "Product Name",
      price: 100,
    });
    UserService.getUserById.mockResolvedValue({
      id: "some-user-id",
      name: "User Name",
    });
    SaleService.createSale.mockResolvedValue(createdSale);

    const response = await request(app).post("/api/v1/sales").send(newSaleData);

    expect(response.statusCode).toBe(201);

    expect(response.body.id).toEqual(createdSale.id);
    expect(response.body.productsId).toEqual(createdSale.productsId);
    expect(response.body.qty).toEqual(createdSale.qty);
    expect(response.body.usersId).toEqual(createdSale.usersId);

    expect(new Date(response.body.saleAt).getTime()).toBe(saleDate.getTime());
  });

  it("should return a 404 status code if the product does not exist", async () => {
    const newSaleData = {
      productsId: "non-existent-product-id",
      qty: 5,
      usersId: "some-user-id",
    };
    ProductService.getProductById.mockResolvedValue(null); // Producto no existe

    const response = await request(app).post("/api/v1/sales").send(newSaleData);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Producto no encontrado");
  });
});
describe("GET /sales", () => {
  it("should retrieve all sales and return 200 status code", async () => {
    const mockSales = [
      {
        /* datos de ventas */
      },
    ];
    SaleService.getAllSales.mockResolvedValue(mockSales);

    const response = await request(app).get("/api/v1/sales");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockSales);
  });
});
describe("PUT /sales/:id", () => {
  it("should update a sale and return 200 status code", async () => {
    const saleId = "some-sale-id";
    const saleDataToUpdate = { qty: 10 };
    const updatedSale = { ...saleDataToUpdate, id: saleId };

    SaleService.updateSale.mockResolvedValue(updatedSale);

    const response = await request(app)
      .put(`/api/v1/sales/${saleId}`)
      .send(saleDataToUpdate);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedSale);
  });
});
describe("DELETE /sales/:id", () => {
  it("should delete a sale and return 200 status code", async () => {
    const saleId = "some-sale-id";
    SaleService.deleteSale.mockResolvedValue(1); // Simula la eliminación exitosa

    const response = await request(app).delete(`/api/v1/sales/${saleId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Venta eliminada con éxito" });
  });
});
