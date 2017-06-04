var express = require('express');
var router = express.Router();

// GET /home
router.get('/', function(req, res, next) {
	return res.render('home', { title: 'Home' });
});

module.exports = router;