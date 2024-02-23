const UserService = require("../../service/userService");

// Asigna permisos basados en los roles
const permissions = {
  admin: [
    "createSale",
    "updateSale",
    "deleteSale",
    "getAllSales",
    "createProduct",
    "listProducts",
    "createUser",
    "listUsers",
    "deleteUser",
    "assignRole",
    "createRole",
    "dailyClosing",
    "monthlyBalance",
    "createRole",
    "listRoles",
    "updateRole",
    "deleteRole",
  ],
  employee: ["listUsers"],
  everyone: ["createSale", "getAllSales"],
};

// Middleware para verificar permisos
exports.checkPermissions = (action) => async (req, res, next) => {
  try {
    const userId = req.header("Auth");
    const role = await UserService.getUserRole(userId);

    if (!role || !permissions[role]?.includes(action)) {
      // Corregido para quitar .name
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  } catch (error) {
    console.error(error); // Log del error para más detalles
    next(error);
  }
};
