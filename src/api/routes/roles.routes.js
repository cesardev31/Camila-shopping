const { Router } = require("express");
const roleController = require("../controllers/roleController");
const { checkPermissions } = require("../middleware/permissionRole");

const router = Router();

router.post("/", checkPermissions("createRole"), roleController.createdRoles);
router.get(
  "/",
  checkPermissions("listRoles"),
  roleController.getAllRolesController
);
router.put(
  "/:id",
  checkPermissions("updateRole"),
  roleController.updateRoleController
);
router.delete(
  "/:id",
  checkPermissions("deleteRole"),
  roleController.deleteRoleController
);

module.exports = router;
