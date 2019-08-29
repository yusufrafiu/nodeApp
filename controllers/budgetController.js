const mongoose = require("mongoose");
const Budget = mongoose.model("Budget");

// method 1 - using callbacks
exports.showBudgets = (req, res) => {
	// 1. get all budgets from db
	Budget.find({}, (err, dbBudgets) => {
		const budgets = dbBudgets.reverse();

		// find all income budgets
		const incomeBudgets = budgets.filter(budget => {
			return budget.type == "income";
		});

		// find all expense
		const expenseBudgets = budgets.filter(budget => {
			return budget.type == "expense";
		});

		let incomeAmount = 0;
		let expenseAmount = 0;

		// finding total amounts for income budgets
		incomeBudgets.forEach(budget => {
			incomeAmount += budget.amount;
		});

		// finding total amounts for budget budgets
		expenseBudgets.forEach(budget => {
			expenseAmount += budget.amount;
		});

		// aggregate balance
		const balance = incomeAmount - expenseAmount;

		// send data along with rendering budget.pug
		res.render("budget", {
			budgets,
			income: incomeAmount,
			expense: expenseAmount,
			balance
		});
	});
};

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

exports.editBudget = (req, res) => {
	Budget.findById(req.params.id, (err, budget) => {
		res.render("edit-budget", { budget });
	});
};

exports.updateBudget = (req, res) => {
	Budget.findByIdAndUpdate(req.params.id, req.body, (err, budget) => {
		// flash message -> updated successfully
		res.redirect("/budget");
	});
};

exports.deleteBudget = (req, res) => {
	Budget.findByIdAndDelete(req.params.id, (err, deletedBudget) => {
		res.redirect("/budget");
	});
};
