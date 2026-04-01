const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const auth = require("../middlewares/authMiddleware");

// GET /api/dashboard/summary
router.get("/summary", auth, dashboardController.getSummary);

module.exports = router;
