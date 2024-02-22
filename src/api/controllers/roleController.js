const {
  createRoles,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../../service/roleService");

exports.createdRoles = async (req, res) => {
  try {
    await createRoles();
    res.status(200).json({ message: "Roles inicializados correctamente." });
  } catch (error) {
    console.error("Error al inicializar los roles:", error);
    res.status(500).json({
      message: "Error al inicializar los roles",
      error: error.message,
    });
  }
};

exports.getAllRolesController = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los roles", error: error.message });
  }
};
exports.updateRoleController = async (req, res) => {
  try {
    const updatedRole = await updateRole(req.params.id, req.body);
    res.json(updatedRole);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.deleteRoleController = async (req, res) => {
  try {
    await deleteRole(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
