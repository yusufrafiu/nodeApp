const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
	type: {
		type: String,
		required: "Please provide the type to this budget",
		trim: true
	},
	desc: {
		type: String,
		required: "Please provide the description of this budget",
		trim: true
	},
	amount: {
		type: Number,
		required: "Please provide the amount to this budget",
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Budget", budgetSchema);
