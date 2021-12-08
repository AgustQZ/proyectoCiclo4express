const express = require('express');
const router = express.Router();

// solicitar la venta en el modelo
const Venta = require('../models/venta');

// llamar al router por medio de mongoose y traer los datos de la bd
router.get('/', async (req, res) => {
        try {
                //guardar en array lo que encuentre en la base datos
                const arrayVentasDB = await Venta.find();
                //mostrar por consola el array al abrir la pagina ejs
                console.log(arrayVentasDB)
                //enrutar a la pagina ejs
                res.render("ventas", {
                        //coge el array que viene de la db y lo descarga en la variable que lee el ejs
                        arrayVentas: arrayVentasDB
                })
        } catch (error) {
                console.log(error)
        }
})


// transportar los datos de los inputs de crear
router.post('/', async (req, res) => {
        const body = req.body
        console.log(body)
        try {
                //primer metodo para enviar los datos y crear una venta en la bd
                        // nota: esta Venta es la que se llamo en la linea 5
                const ventaDB = new Venta(body)
                await ventaDB.save()
                //redireccionar despues de enviar los datos
                res.redirect('ventas')
        } catch (error) {
                console.log('error', error)
        }
})

module.exports = router;