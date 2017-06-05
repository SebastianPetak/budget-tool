var express = require('express');
var router = express.Router();
var User = require('./models/User.model.js');

// GET /home
router.get('/', function(req, res, next) {
	return res.render('about', { title: 'About' });
});

// GET /signup
router.get('/signup', function(req, res, next) {
	return res.render('signup', { title: 'Sign Up' });
});

// POST /signup
router.post('/signup', function(req, res, next) {
	if(req.body.email &&
		req.body.password &&
		req.body.confirmPassword) {

			if(req.body.password !== req.body.confirmPassword) {
				var err = new Error('Passwords must match.');
				err.status = 400;
				return next(err);
			}

			var userData = {
				email: req.body.email,
				password: req.body.password
			};

			User.create(userData).then(function(user) {
				// TODO create user session
				// TODO redirect to /profile
			}).catch(function(err) {
				return next(err);
			});

		} else {
			var err = new Error('All fields required.');
			err.status = 400;
			return next(err)
		}
	return res.render('signup', { title: 'Sign Up' });
});

module.exports = router;
