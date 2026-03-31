const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const auth = require("../middlewares/authMiddleware");
const accountValidation = require("../middlewares/accountValidation");

router.post("/", auth, accountValidation, accountController.insert);
router.get("/", auth, accountController.getMyAccounts);
router.put("/:id", auth, accountController.updateAccount);
router.delete("/:id", auth, accountController.deleteAccount);

module.exports = router;
