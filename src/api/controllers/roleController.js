const Role = require('../../models/Roles');

// Controlador para inicializar roles en la base de datos
exports.createdRoles = async (req, res) => {
  try {
    // Lista de roles a crear
    const roles = [
      { name: 'admin' },
      { name: 'employee' },
      { name: 'everyone' }
    ];

    // Recorre cada rol y lo crea si no existe
    const rolesPromises = roles.map(async (role) => {
      const [roleInstance, created] = await Role.findOrCreate({
        where: { name: role.name },
        defaults: role
      });

      if (created) {
        console.log(`El rol ${role.name} fue creado exitosamente.`);
      } else {
        console.log(`El rol ${role.name} ya existe.`);
      }

      return roleInstance;
    });

    // Espera a que todos los roles sean procesados
    await Promise.all(rolesPromises);

    res.status(200).json({ message: 'Roles inicializados correctamente.' });
  } catch (error) {
    console.error('Error al inicializar los roles:', error);
    res.status(500).json({ message: 'Error al inicializar los roles', error: error.message });
  }
};
