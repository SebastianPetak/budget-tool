var mongoose = require('mongoose');

var BudgetItemSchema = new mongoose.Schema({
	'user_id': {
		type: String,
		require: true,
		postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	'item': {
		type: String,
		require: true
	},
	'cost': {
		type: Number,
		require: true,
	},
	'category': {
		type: String,
		require: true
	}
});



var BudgetItem = mongoose.model('BudgetItem', BudgetItemSchema);
module.exports = BudgetItem;
