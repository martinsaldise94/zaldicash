const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const auth = require("../middlewares/authMiddleware");

// todos los movimientos
router.get("/", auth, transactionController.getMyTransactions);

module.exports = router;
