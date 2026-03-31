const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const transactionValidation = require("../middlewares/transactionValidation");
const auth = require("../middlewares/authMiddleware");

// todos los movimientos
router.get("/", auth, transactionController.getMyTransactions);

//transacción manual
router.post(
  "/",
  auth,
  transactionValidation,
  transactionController.createManual,
);

module.exports = router;
