var loggedOut = (req, res, next) => {
	if (req.session && req.session.userId) {
		return res.redirect('/budget');
	}
	return next();
};

var requiresLogin = (req, res, next) => {
	if (req.session && req.session.userId) {
		return next();
	}
	var err = new Error('You must be logged in to view this page');
	err.status = 401;
	return next(err);
};

module.exports.requiresLogin = requiresLogin;
module.exports.loggedOut = loggedOut;
