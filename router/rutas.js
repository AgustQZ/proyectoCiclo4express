const express = require('express');
const router = express.Router();

//ruta index
router.get('/', (req, res) => {
    res.render('index');
});

//ruta sucursales
router.get('/sucursales', (req, res) => {
    res.render('sucursales');
});

//ruta menu
router.get('/menu', (req, res) => {
    res.render('menu');
});



module.exports = router;