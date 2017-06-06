var express = require('express');
var router = express.Router();
var User = require('./models/User.model.js');
var mid = require('./middleware');

// GET /home
router.get('/', function(req, res, next) {
	return res.render('about', { title: 'About' });
});

// GET /signup
router.get('/signup', mid.loggedOut, function(req, res, next) {
	return res.render('signup', { title: 'Sign Up' });
});

// GET /budget
router.get('/budget', mid.requiresLogin, function(req, res, next) {
	User.findById(req.session.userId)
	.exec(function(err, user) {
		if(err) {
			return next(err);
		} else {
			return res.render('budget', {
				title: 'Budget'
			});
		}
	});
});

// POST /signup
router.post('/signup', function(req, res, next) {
	if(req.body.email &&
		req.body.password &&
		req.body.confirmPassword) {

		if(req.body.password !== req.body.confirmPassword) {
			var err = new Error('Passwords do not match.');
			err.status = 400;
			return next(err);
		}

		var userData = {
			email: req.body.email,
			password: req.body.password
		};

		// user schema's 'create' method to insert document into mongoose
		User.create(userData).then(function(user) {
			// create user session
			req.session.userId = user._id;
			// redirect to /profile
			return res.redirect('/budget');
		}).catch(function(err) {
			return next(err);
		});

	} else {
		var err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
	return res.render('login', { title: 'Log In' });
});

// POST /login
router.post('/login', function(req, res, next) {
	if(req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password).then(function(user) {
			req.session.userId = user._id;
			return res.redirect('/budget');
		}).catch(function(err) {
			var err = new Error('Incorrect email or password.');
			err.status = 401;
			return next(err);
		});
	}
});

// GET /logout
router.get('/logout', function(req, res, next) {
	if (req.session) {
		// delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;
