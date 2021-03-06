const express = require('express');
const passport = require('passport');
const router = express.Router();

//ruta index
router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/index");
}, (req, res) => {
    res.render('sucursales');
});

//ruta login
router.get('/index', (req, res) => {
    res.render('index');
});

//ruta menu
router.get('/sucursales', (req, res) => {
    res.render('sucursales');
});

//ruta reportes
router.get('/reportes', (req, res) => {
    res.render('reportes');
});

// nueva vista para recibir credenciales e iniciar sesion--middleware
router.post("/index", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/index"
}));

module.exports = router;