const mongoose = require("mongoose");
const Budget = mongoose.model("Budget");

// method 1 - using callbacks
exports.showBudgets = (req, res) => {
	// 1. get all budgets from db
	Budget.find({}, (err, dbBudgets) => {
		const budgets = dbBudgets.reverse();
		// res.send(budgets);
		// data needed  a) budgets b) allIncomeAmount
		// c) allExpenseAmount d)total

		// 2. pass the gotten budgets to the view
		// res.render("budget", { budgets: budgets });
		res.render("budget", { budgets });
	});
};

// method 2: using async/await (better method to the first one)
// exports.showBudgets = async (req, res) => {
// 	// 1. get all budgets from db
// 	const dbBudgets = await Budget.find({});
// 	const budgets = dbBudgets.reverse();
// 	res.render("budget", { budgets });
// };

exports.addBudget = (req, res) => {
	res.render("add-budget");
};

exports.saveBudget = async (req, res) => {
	// 1. save in db
	const budget = await new Budget(req.body).save();

	// 2. todo flash messsage 'budget created successfully"

	// 3. redirect to /budget
	res.redirect("/budget");
};
