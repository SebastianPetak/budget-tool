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
	},
});

// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password) {
	return User.findOne({ email: email })
		.exec(function(err, user) {
			if(err) {
				return err;
			} else if (!user) {
				var err = new Error('User not found.');
				err.status = 401;
				return err;
			}
			bcrypt.compare(password, user.password).then(function(result) {
				if (result === true) {
					return user;
				} else {
					var err = new Error('Incorrect email or password');
					err.status = 401;
					return err;
				}
			});
		});
};

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
