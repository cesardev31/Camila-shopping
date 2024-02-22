const { Router } = require("express");
const { checkPermissions } = require("../middleware/permissionRole");
const {
  dailyClosing,
  monthlyBalance,
} = require("../controllers/closingController");

const router = Router();

router.get(
  "/daily-closing/:date",
  checkPermissions("dailyClosing"),
  dailyClosing
);
router.get(
  "/monthly-balance/:month",
  checkPermissions("monthlyBalance"),
  monthlyBalance
);

module.exports = router;
