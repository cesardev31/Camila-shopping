const { Router } = require("express");
const { checkPermissions } = require("../middleware/permissionRole");
const asyncHandler = require("../../utils/asyncHandler");
const {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");

const router = Router();

router.post(
  "/",
  asyncHandler(checkPermissions("createUser")),
  asyncHandler(createUserController)
);
router.get(
  "/",
  asyncHandler(checkPermissions("listUsers")),
  asyncHandler(getAllUsersController)
);
router.put(
  "/:id",
  asyncHandler(checkPermissions("updateUser")),
  asyncHandler(updateUserController)
);
router.delete(
  "/:id",
  asyncHandler(checkPermissions("deleteUser")),
  asyncHandler(deleteUserController)
);

module.exports = router;
