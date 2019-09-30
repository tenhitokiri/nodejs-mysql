const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
	res.render('links/add');
});

//Agregar un link
router.post('/add', isLoggedIn, async (req, res) => {
	const { title, url, description } = req.body;
	const newLink = {
		title,
		url,
		description,
		user_id     : req.user.id
	};
	await pool.query('insert into links set ?', [ newLink ]);
	req.flash('success', 'Link agregado con exito!');
	res.redirect('/links/');
});

//Listar todos los links
router.get('/', isLoggedIn, async (req, res) => {
	const links = await pool.query('select * from links where user_id = ?', [ req.user.id ]);
	res.render('links/links', { links });
});

//Eliminar un Link
router.get('/delete/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	await pool.query('delete from links where id = ? and user_id = ?', [ id, req.user.id ]);
	req.flash('success', 'Link eliminado con exito!');
	res.redirect('/links');
});

//Editar Link
router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { title, url, description } = req.body;
	updatedLink = {
		title,
		url,
		description
	};

	const update = await pool.query('update links set  ? where id = ?', [ updatedLink, id ]);
	req.flash('success', 'Link editado con exito!');
	res.redirect('/links/');
});

//Editar link
router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const link = await pool.query('select * from links where id = ?', [ id ]);
	res.render('links/edit', { link: link[0] });
});
module.exports = router;
