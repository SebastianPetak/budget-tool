var mongoose = require('mongoose');

var BudgetSchema = new mongoose.Schema({
	'user_id': {
		type: String,
		require: true,
		unique: true
	},
	'monthlyIncome': {
		type: Number,
		require: true,
	},
	'fixedCosts': {
		type: Array
	},
	'spendingMoney': {
		type: Array
	}
});



var Budget = mongoose.model('Budget', BudgetSchema);
module.exports = Budget;
