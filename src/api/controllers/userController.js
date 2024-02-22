const { createUser, getAllUsers, updateUser, deleteUser } = require('../../service/userService');

exports.createUserController = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserController = async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteUserController = async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
