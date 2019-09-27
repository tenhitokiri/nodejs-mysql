module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isLoggedIn()) {
			return next();
		} else {
			res.redirect('/users/login');
		}
	}
};
