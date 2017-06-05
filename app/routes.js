var express = require('express');
var router = express.Router();

// GET /home
router.get('/', function(req, res, next) {
	return res.render('about', { title: 'About' });
});

// GET /signup
router.get('/signup', function(req, res, next) {
	return res.render('signup', { title: 'Sign Up' });
})

module.exports = router;
