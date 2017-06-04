var express = require('express');
var router = express.Router();

// GET /home
router.get('/', function(req, res, next) {
	return res.render('about', { title: 'About' });
});

module.exports = router;
