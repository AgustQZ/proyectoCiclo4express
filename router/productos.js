const express = require('express');
const router = express.Router();

// solicitar el producto en el modelo
const Producto = require('../models/producto');

// llamar al router por medio de mongoose
router.get('/', async (req, res) => {
    try {
        //guardar en array lo que encuentre en la base datos
        const arrayProductosDB = await Producto.find();
        //mostrar por consola el array al abrir la pagina ejs
        console.log(arrayProductosDB)
        //enrutar a la pagina ejs
        res.render("productos", {
            //coge el array que viene de la db y lo descarga en la variable que lee el ejs
            arrayProductos: arrayProductosDB
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;