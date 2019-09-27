const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
const { puede } = require('../lib/auth');

router.get('/registro', (req, res) => {
	res.render('users/registro');
});

router.post(
	'/registro',
	passport.authenticate('registro.local', {
		successRedirect : 'perfil',
		failureRedirect : 'registro',
		failureFlash    : true
	})
);

router.get('/perfil', puede(), (req, res) => {
	res.render('users/perfil');
});

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('login.local', {
		successRedirect : 'perfil',
		failureRedirect : 'login',
		failureFlash    : true
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
