const express = require('express');
const router = express.Router();

//Ruta inicial
router.get('/', (req, res) => {
    res.send('Holas')
})

module.exports = router;