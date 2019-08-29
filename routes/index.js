const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const budgetController = require("../controllers/budgetController");

// main routes
router.get("/", mainController.homepage);
router.get("/about", mainController.about);
router.get("/contact-us", mainController.contactUs);

// budget routes
router.get("/budget", budgetController.showBudgets);
router.get("/budget/add", budgetController.addBudget);
router.post("/budget/add", budgetController.saveBudget);

router.get("/budget/edit/:id", budgetController.editBudget);
router.post("/budget/edit/:id", budgetController.updateBudget);

router.get("/budget/delete/:id", budgetController.deleteBudget);

module.exports = router;
