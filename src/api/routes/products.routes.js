const { Router } = require("express");
const productController = require("../controllers/productController");
const { checkPermissions } = require("../middleware/permissionRole");
const router = Router();

router.post(
  "/",
  checkPermissions("createProduct"),
  productController.createProduct
);
router.get("/", productController.listProducts);

module.exports = router;
