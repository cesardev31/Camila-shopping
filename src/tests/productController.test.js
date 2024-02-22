const request = require('supertest');
const app = require('../app'); 
const productService = require('../service/productService');

// Mock the productService calls
jest.mock('../service/productService');

describe('POST /products', () => {
  it('should create a new product', async () => {
    const newProduct = { name: 'Test Product', description: 'Test Description', price: 1000 };
    
    // Setup the mock to resolve with some data
    productService.createProduct.mockResolvedValue(newProduct);
    
    const response = await request(app)
      .post('/api/v1/products')
      .send(newProduct);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newProduct);
    expect(productService.createProduct).toHaveBeenCalledWith(newProduct);
  });

  it('should handle errors when creating a new product', async () => {
    const newProduct = { name: 'Test Product', description: 'Test Description', price: 1000 };
    
    // Setup the mock to reject with an error
    productService.createProduct.mockRejectedValue(new Error('Error creating product'));
    
    const response = await request(app)
      .post('/api/v1/products')
      .send(newProduct);
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Error al crear el producto');
  });
});

describe('GET /products', () => {
  it('should list all products', async () => {
    // Setup the mock to resolve with some data
    productService.listProducts.mockResolvedValue([/* some products here */]);
    
    const response = await request(app)
      .get('/api/v1/products');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([/* expected products here */]);
    expect(productService.listProducts).toHaveBeenCalled();
  });
});
