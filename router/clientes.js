const express = require('express');
const router = express.Router();

// solicitar el cliente en el modelo
const Cliente = require('../models/cliente');
// llamar al router por medio de mongoose
router.get('/', async(req, res) => {
    try {
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render("clientes", {
            arrayClientes: arrayClientesDB
        })
    } catch (error) {
        console.log(error)
    }
})

//crear un ingreso a clientes
router.get('/crear', (req, res) => {
    res.render('crear');
})

// transportar los datos de los inputs de crear
router.post('/', async(req, res) => {
    const body = req.body
    console.log(body)
    try {
        //primer metodo para enviar datos a la bd
        const clienteDB = new Cliente(body)
        await clienteDB.save()

        //segund metodo para enviar dtos a la bd
        //await Cliente.create(body)

        //redireccionar luego de enviar los datos
        res.redirect('clientes')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findOne({
            _id: id
        })
        console.log(clienteDB)
        res.render('detalle', {
            cliente: clienteDB,
            error: false
        })
    } catch (error) {
        res.render('detalle', {
            error: true
        })
    }
})

module.exports = router;