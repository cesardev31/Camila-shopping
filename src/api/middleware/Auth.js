const UserService = require("../../service/userService")

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.header('Auth');
    const role = await UserService.getUserRole(userId);
    console.log(role);

    if (!role || !permissions[role.name].includes(req.route.methods)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Autenticación fallida', error: error.message });
  }
};

module.exports = authMiddleware;
