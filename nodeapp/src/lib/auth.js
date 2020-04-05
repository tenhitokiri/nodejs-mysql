module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/users/login');
		}
	},
	isNotLoggedIn(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/users/perfil');
		}
	}
};
