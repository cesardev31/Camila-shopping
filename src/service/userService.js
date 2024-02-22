const User = require("../models/User");
const Role = require("../models/Roles");

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (userId) => {
  return await User.findByPk(userId);
};

const updateUser = async (userId, userData) => {
  const [updated] = await User.update(userData, { where: { id: userId } });
  if (updated) {
    const updatedUser = await User.findByPk(userId);
    return updatedUser;
  }
  throw new Error("Usuario no encontrado");
};

const deleteUser = async (userId) => {
  const deleted = await User.destroy({ where: { id: userId } });
  if (!deleted) {
    throw new Error("Usuario no encontrado");
  }
  return deleted;
};

const getUserRole = async (userId) => {
  const user = await User.findByPk(userId, {
    include: Role,
  });

  if (!user || !user.Role) {
    throw new Error("Role not found");
  }

  return user.Role.name;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserRole,
};
