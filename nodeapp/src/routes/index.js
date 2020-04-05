const express = require('express');
const router = express.Router();

//Ruta inicial
router.get('/', (req, res) => {
	res.render('main');
});

module.exports = router;
