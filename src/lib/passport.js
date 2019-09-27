const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use(
	'login.local',
	new LocalStrategy(
		{
			usernameField     : 'username',
			passwordField     : 'password',
			passReqToCallback : true
		},
		async (req, username, password, done) => {
			const rows = await pool.query('select * from users where username = ?', [ username ]);
			if (rows.length > 0) {
				const user = rows[0];
				console.log(user);
				const validPassword = await helpers.comparepwd(password, user.password);
				if (validPassword) {
					done(null, user, req.flash('success', 'Welcome ' + user.username));
				} else {
					done(null, false, req.flash('error', 'Incorrect Password'));
				}
			} else {
				return done(null, false, req.flash('error', 'Usuario no existe!!'));
			}
		}
	)
);

passport.use(
	'registro.local',
	new LocalStrategy(
		{
			usernameField     : 'username',
			passwordField     : 'password',
			passReqToCallback : true
		},
		async (req, username, password, done) => {
			console.log(req.body);
			const { fullname } = req.body;
			const newUser = {
				username,
				password,
				fullname
			};
			newUser.password = await helpers.Encryptpwd(password);
			console.log(newUser);
			const result = await pool.query('insert into users set ?', [ newUser ]);
			console.log(result);
			newUser.id = result.insertId;
			return done(null, newUser);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const row = await pool.query('select * from users where id = ?', [ id ]);
	done(null, row[0]);
});

module.exports = passport;
