var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var configDB = require('./config/database.js');
var app = express();

// mongodb connection
var db;
mongoose.connect(configDB.url).then(function(connection) {
	db = connection;
}).catch(function(err) {
	console.log('Database Error:', err)
});

// TODO use session for tracking logins

// TODO make user ID available in templates

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// server static files from /public
app.use(express.static(__dirname + '/public'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./app/routes');
app.use('/', routes);

// catch 404
app.use(function(req, res, next) {
	var err = new Error('File Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		title: 'error',
		error: {}
	});
});

// listen on port 8001
app.listen(8001, function() {
	console.log('Express app listening on port 8001');
});
