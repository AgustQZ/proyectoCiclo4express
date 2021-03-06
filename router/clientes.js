const express = require('express');
const router = express.Router();

// solicitar el cliente en el modelo
const Cliente = require('../models/cliente');

// llamar al router por medio de mongoose
router.get('/', async (req, res) => {
    try {
        //guardar en array lo que encuentre en la base datos
        const arrayClientesDB = await Cliente.find();
        //mostrar por consola el array al abrir la pagina ejs
        console.log(arrayClientesDB)
        //enrutar a la pagina ejs
        res.render("clientes", {
            //coge el array que viene de la db y lo descarga en la variable que lee el ejs
            arrayClientes: arrayClientesDB
        })
    } catch (error) {
        console.log(error)
    }
})

//Editar cliente
router.get('/editar', (req, res) => {
    res.render('editarCliente');
})

//enrutar a crear cliente
router.get('/crear', (req, res) => {
    res.render('crear');
})

// transportar los datos de los inputs de crear.ejs
router.post('/', async (req, res) => {
    //const para pedir lo que tenga el body del ejs
    const body = req.body
    console.log(body)
    try {
        //primer metodo para enviar datos de los inputs a la bd
        const clienteDB = new Cliente(body)

        await clienteDB.save()
        //redireccionar luego de enviar los datos
        res.redirect('clientes')
    } catch (error) {
        console.log('error', error)
    }
})

// buscar por id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findOne({
            _id: id
        })
        console.log(clienteDB)
        res.render('editarCliente', {
            cliente: clienteDB,
            error: false
        })
        clienteDB.save()
    } catch (error) {
        res.render('editarCliente', {
            error: true
        })
    }
})
// editar
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const clienteDB = await Cliente.findByIdAndUpdate(
            id, body, { useFindAndModify: false })
        console.log(clienteDB)
        res.json({
            estado: true,
            mensaje: 'Cliente Editado'
        })
    } catch (error) {
        res.json({
            estado: false,
            mensaje: 'Fallo al Editar'
        })
        console.log(error)
    }
})
// eliminar
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    Cliente.remove({ _id: id }, (err, arrayClientes) => {
        if (err) throw err;
        res.redirect('/clientes');
    });
});


module.exports = router;