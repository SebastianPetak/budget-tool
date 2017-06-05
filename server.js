var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var MongoStore = require('connect-mongo')(session);
var configDB = require('./config/database.js');
var app = express();

// mongodb connection
mongoose.connect(configDB.url);
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// use session for tracking logins
app.use(session({
	secret: 'monthly budget is vital',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));

// make user ID available in templates
app.use(function(req, res, next) {
	res.locals.currentUser = req.session.userId;
	next();
});

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
