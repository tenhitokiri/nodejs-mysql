const express = require('express');
const path = require('path');
const morgan = require('morgan');
const express_hbs = require('express-handlebars');
//const bootstrap = require('bootstrap');

const app = express();

//Configuración de la aplicación
const port = process.env.PORT || 3500;
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', express_hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')
//

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//Rutas
app.use(require('./routes/index'));
app.use('/users', require('./routes/auth'));
app.use('/links', require('./routes/links'));

//Archivos Estáticos
app.use(express.static(path.join(__dirname, 'public')));

//404 handle
app.use((req, res, next) => {
    res.status(404).send('404 error');
});

//Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

module.exports = app;