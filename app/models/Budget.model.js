var mongoose = require('mongoose');

var BudgetSchema = new mongoose.Schema({
	'user_id': {
		type: String,
		require: true,
		postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	'monthlyIncome': {
		type: Number,
		require: true,
		default: 0
	}
});



var Budget = mongoose.model('Budget', BudgetSchema);
module.exports = Budget;
