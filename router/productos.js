const express = require('express');
const router = express.Router();

// solicitar el producto en el modelo
const Producto = require('../models/producto');
// llamar al router por medio de mongoose
router.get('/', async(req, res)=> {
    try {
        const arrayProductosDB = await Producto.find();
        console.log(arrayProductosDB)
        res.render("productos", {
            arrayProductos: arrayProductosDB
        })
    } catch (error) {
        console.log(error)
    }
})

//crear un ingreso a Produtos
router.get('/crear', (req, res)=>{
    res.render('crear');
})

// transportar los datos de los inputs de crear
router.post('/', async(req, res)=>{
    const body = req.body
    console.log(body)
    try {
        //primer metodo para enviar datos a la bd
        const productoDB = new Producto(body)
        await productoDB.save() 

        //segund metodo para enviar dtos a la bd
        //await Cliente.create(body)

        //redireccionar luego de enviar los datos
        res.redirect('productos')
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = router;