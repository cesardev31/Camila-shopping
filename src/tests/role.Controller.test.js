const request = require("supertest");
const app = require("../app");
const roleService = require("../service/roleService");

// Mock the roleService calls
jest.mock("../service/roleService");

describe("Roles Controller Tests", () => {
  describe("POST /roles", () => {
    it("should initialize roles", async () => {
      // Setup the mock to resolve
      roleService.createRoles.mockResolvedValue();

      const response = await request(app).post("/api/v1/roles");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Roles inicializados correctamente.",
      });
      expect(roleService.createRoles).toHaveBeenCalled();
    });
  });

  describe("GET /roles", () => {
    it("should list all roles", async () => {
      const mockRoles = [{ name: "admin" }, { name: "employee" }];

      // Setup the mock to resolve with some roles
      roleService.getAllRoles.mockResolvedValue(mockRoles);

      const response = await request(app).get("/api/v1/roles");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockRoles);
      expect(roleService.getAllRoles).toHaveBeenCalled();
    });
  });

  describe("PUT /roles/:id", () => {
    it("should update a role", async () => {
      const roleId = "some-role-id";
      const updatedRole = { name: "updatedRole" };

      // Setup the mock to resolve with the updated role
      roleService.updateRole.mockResolvedValue(updatedRole);

      const response = await request(app)
        .put(`/api/v1/roles/${roleId}`)
        .send(updatedRole);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updatedRole);
      expect(roleService.updateRole).toHaveBeenCalledWith(roleId, updatedRole);
    });
  });

  describe("DELETE /roles/:id", () => {
    it("should delete a role", async () => {
      const roleId = "some-role-id";

      // Setup the mock to resolve
      roleService.deleteRole.mockResolvedValue();

      const response = await request(app).delete(`/api/v1/roles/${roleId}`);

      expect(response.statusCode).toBe(204);
      expect(roleService.deleteRole).toHaveBeenCalledWith(roleId);
    });
  });
});
