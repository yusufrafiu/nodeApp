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

module.exports = router;
