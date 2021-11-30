const express = require('express');
const router = express.Router();

// solicitar la venta en el modelo
const Venta = require('../models/venta');

// llamar al router
router.get('/', (req, res) => {
        res.render("ventas")
})

module.exports = router;