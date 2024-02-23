const request = require("supertest");
const app = require("../app");
const productService = require("../service/productService");
const userService = require("../service/userService");

// Mock the productService calls
jest.mock("../service/productService");
jest.mock("../service/userService");

describe("POST /products", () => {
  beforeAll(() => {
    userService.getUserRole.mockResolvedValue("admin");
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("should create a new product", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      price: 1000,
    };

    productService.createProduct.mockResolvedValue(newProduct);

    const response = await request(app)
      .post("/api/v1/products")
      .set("Auth", "some-valid-token")
      .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newProduct);
    expect(productService.createProduct).toHaveBeenCalledWith(newProduct);
  });

  it("should handle errors when creating a new product", async () => {
    const newProduct = {
      name: "Test Product",
      description: "Test Description",
      price: 1000,
    };

    productService.createProduct.mockRejectedValue(
      new Error("Error al crear el producto")
    );

    const response = await request(app)
      .post("/api/v1/products")
      .set("Auth", "some-valid-token")
      .send(newProduct);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty(
      "message",
      "Error al crear el producto"
    );
  });
});

describe("GET /products", () => {
  beforeAll(() => {
    userService.getUserRole.mockResolvedValue("admin");
  });

  it("should list all products", async () => {
    const products = [];

    productService.listProducts.mockResolvedValue(products);

    const response = await request(app)
      .get("/api/v1/products")
      .set("Auth", "some-valid-token");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(products);
    expect(productService.listProducts).toHaveBeenCalled();
  });
});
