const request = require("supertest");
const app = require("../app");
const userService = require("../service/userService");

// Mock the userService calls
jest.mock("../service/userService");
jest.mock("../api/middleware/permissionRole", () => ({
  checkPermissions: () => (req, res, next) => next(),
}));

describe("User Controller Tests", () => {
  beforeEach(() => {
    userService.getUserRole.mockResolvedValue("admin");
  });
  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = {
        document: "1234567890",
        firstName: "Test",
        lastName: "User",
        rolesId: "some-role-id",
      };

      userService.createUser.mockResolvedValue(newUser);

      const response = await request(app)
        .post("/api/v1/users")
        .set("Auth", "fake-user-id")
        .send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newUser);
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });
  });

  describe("GET /users", () => {
    it("should list all users", async () => {
      const mockUsers = [
        {
          document: "1234567890",
          firstName: "Test",
          lastName: "User",
          rolesId: "some-role-id",
        },
        // Agrega más usuarios de prueba según sea necesario
      ];

      userService.getAllUsers.mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/v1/users");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(userService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user", async () => {
      const userId = "some-user-id";
      const userDataToUpdate = { firstName: "Updated", lastName: "User" };
      const updatedUser = { ...userDataToUpdate, id: userId };

      userService.updateUser.mockResolvedValue(updatedUser);

      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send(userDataToUpdate);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedUser);
      expect(userService.updateUser).toHaveBeenCalledWith(
        userId,
        userDataToUpdate
      );
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      const userId = "some-user-id";

      userService.deleteUser.mockResolvedValue(1); // Simula la eliminación exitosa

      const response = await request(app).delete(`/api/v1/users/${userId}`);

      expect(response.statusCode).toBe(204);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
