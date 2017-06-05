var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

// TODO authenticate input against database documents

// hash password before saving to database
UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10).then(function(hash) {
		user.password = hash;
		next();
	}).catch(function(err) {
		return next(err);
	});
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
