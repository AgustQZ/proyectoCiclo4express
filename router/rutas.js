const express = require('express');
const router = express.Router();

//ruta index
router.get('/', (req, res) => {
    res.render('index', {titulo:'Login'});
});

//ruta sucursales
router.get('/sucursales', (req, res) => {
    res.render('sucursales', {titulo:'Sucursales'});
});

//ruta menu
router.get('/menu', (req, res) => {
    res.render('menu', {titulo:'Menu'});
});

module.exports = router;