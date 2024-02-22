const { Router } = require("express");
const roleController = require("../controllers/roleController");

const router = Router();

router.post("/", roleController.createdRoles);
router.get("/", roleController.getAllRolesController);
router.put("/:id", roleController.updateRoleController);
router.delete("/:id", roleController.deleteRoleController);

module.exports = router;
