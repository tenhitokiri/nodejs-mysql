const express = require('express');
const path = require('path');
const morgan = require('morgan');
const express_hbs = require('express-handlebars');
const flash = require('connect-flash');

const session = require('express-session');
const mySqlStore = require('express-mysql-session');
const { database } = require('./keys');

//const bootstrap = require('bootstrap');

const app = express();

//Configuración de la aplicación
const port = process.env.PORT || 3500;
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'.hbs',
	express_hbs({
		defaultLayout : 'main',
		layoutsDir    : path.join(__dirname, 'views', 'layouts'),
		partialsDir   : path.join(app.get('views'), 'partials'),
		extname       : '.hbs',
		helpers       : require('./lib/handlebars')
	})
);
app.set('view engine', '.hbs');

// Express Session
app.use(
	session({
		secret            : 'melita cat',
		resave            : false,
		saveUninitialized : false,
		store             : new mySqlStore(database)
	})
);

//Middleware
app.use(flash());

app.use(morgan('dev'));
app.use(
	express.urlencoded({
		extended : false
	})
);
app.use(express.json());

//Variables globales
app.use((req, res, next) => {
	app.locals.success = req.flash('success');
	next();
});

//Rutas
app.use(require('./routes/index'));
app.use('/users', require('./routes/auth'));
app.use('/links', require('./routes/links'));

//Archivos Estáticos
app.use(express.static(path.join(__dirname, 'public')));

//404 handle
app.use((req, res, next) => {
	res.status(404).send('404 error');
	next();
});

module.exports = app;
