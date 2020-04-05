const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/registro', isNotLoggedIn, (req, res) => {
	res.render('users/registro');
});

router.post(
	'/registro',
	isNotLoggedIn,
	passport.authenticate('registro.local', {
		successRedirect : 'perfil',
		failureRedirect : 'registro',
		failureFlash    : true
	})
);

router.get('/perfil', isLoggedIn, (req, res) => {
	res.render('users/perfil');
});

router.get('/login', isNotLoggedIn, (req, res) => {
	res.render('users/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('login.local', {
		successRedirect : 'perfil',
		failureRedirect : 'login',
		failureFlash    : true
	})(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
