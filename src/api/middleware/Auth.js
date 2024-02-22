const User = require('../../models/User');
const Role = require('../../models/Roles');

const adminAuthMiddleware = async (req, res, next) => {
  const userId = req.headers['auth'];

  if (!userId) {
    return res.status(401).json({ message: 'No se proporcionó el ID de usuario en el header Auth.' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'El usuario no existe.' });
    }

    const role = await Role.findByPk(user.rolesId);

    if (role && role.name === 'administrador') {
      next(); // Continúa con el siguiente middleware o controlador
    } else {
      return res.status(403).json({ message: 'El usuario no tiene permisos de administrador.' });
    }
  } catch (error) {
    console.error('Error al verificar el rol del usuario:', error);
    return res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud.' });
  }
};

module.exports = adminAuthMiddleware;
