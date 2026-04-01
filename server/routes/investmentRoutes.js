const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investmentController");
const auth = require("../middlewares/authMiddleware"); // vigila quien está pidiendo
const investmentValidation = require("../middlewares/investmentValidation");

// Solo si el token es válido, se ejecutan estas funciones
router.post("/", auth, investmentValidation, investmentController.create);
router.get("/", auth, investmentController.listMyInvestments);
router.get("/refresh", auth, investmentController.refreshPrices);

module.exports = router;
