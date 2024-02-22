const Role = require("../models/Roles");

const rolesData = [
  { name: "admin" },
  { name: "employee" },
  { name: "everyone" },
];

const createRoles = async () => {
  const rolesPromises = rolesData.map(async (role) => {
    const [roleInstance, created] = await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });

    if (created) {
      console.log(`El rol ${role.name} fue creado exitosamente.`);
    } else {
      console.log(`El rol ${role.name} ya existe.`);
    }

    return roleInstance;
  });

  await Promise.all(rolesPromises);
  console.log("Todos los roles han sido inicializados correctamente.");
};

const getAllRoles = async () => {
  const roles = await Role.findAll();
  return roles;
};

const updateRole = async (roleId, roleDetails) => {
  const [updated] = await Role.update(roleDetails, {
    where: { id: roleId },
  });
  if (updated) {
    const updatedRole = await Role.findByPk(roleId);
    return updatedRole;
  }
  throw new Error("Rol no encontrado");
};

const deleteRole = async (roleId) => {
  const deleted = await Role.destroy({
    where: { id: roleId },
  });
  if (!deleted) {
    throw new Error("Rol no encontrado");
  }
  return deleted;
};

module.exports = {
  createRoles,
  getAllRoles,
  updateRole,
  deleteRole,
};
