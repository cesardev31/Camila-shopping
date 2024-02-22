const { Router } = require("express");
const salesController = require("../controllers/salesController");
const { checkPermissions } = require("../middleware/permissionRole");

const router = Router();

router.post("/", salesController.createSale);
router.get("/", salesController.getAllSales);
router.put("/:id", checkPermissions("updateSale"), salesController.updateSale);
router.delete(
  "/:id",
  checkPermissions("deleteSale"),
  salesController.deleteSale
);

module.exports = router;
