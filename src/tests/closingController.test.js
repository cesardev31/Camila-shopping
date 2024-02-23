const request = require("supertest");
const app = require("../app");
const SaleService = require("../service/saleService");

// Mock the SaleService
jest.mock("../service/saleService");
jest.mock("../api/middleware/permissionRole", () => ({
  checkPermissions: () => (req, res, next) => next(),
}));

describe("Closing Controller Tests", () => {
  describe("GET /daily-closing/:date", () => {
    it("should calculate total sales for a given day and return 200 status code", async () => {
      const mockDate = "2023-01-01";
      const mockTotalSalesValue = 1000;

      // Simula el cálculo del total de ventas para el día
      SaleService.calculateTotalSalesForDay.mockResolvedValue(
        mockTotalSalesValue
      );

      const response = await request(app).get(
        `/api/v1/closing/daily-closing/${mockDate}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ totalSalesValue: mockTotalSalesValue });
      expect(SaleService.calculateTotalSalesForDay).toHaveBeenCalledWith(
        mockDate
      );
    });
  });

  describe("GET /monthly-balance/:month", () => {
    it("should calculate total sales for a given month and return 200 status code", async () => {
      const mockMonth = "2023-01"; // YYYY-MM format
      const mockTotalSalesValue = 5000;

      // Simula el cálculo del total de ventas para el mes
      SaleService.calculateTotalSalesForMonth.mockResolvedValue(
        mockTotalSalesValue
      );

      const response = await request(app).get(
        `/api/v1/closing/monthly-balance/${mockMonth}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ totalSalesValue: mockTotalSalesValue });
      expect(SaleService.calculateTotalSalesForMonth).toHaveBeenCalledWith(
        mockMonth
      );
    });
  });
});
