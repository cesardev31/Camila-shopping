const { Router } = require("express");
const roleController = require("../controllers/roleController");

const router = Router();

router.post("/", roleController.createdRoles);

module.exports = router;
