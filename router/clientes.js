const express = require('express');
const router = express.Router();

// solicitar el cliente en el modelo
const Cliente = require('../models/cliente');
// llamar al router por medio de mongoose
router.get('/', async(req, res)=> {
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
router.get('/crear', (req, res)=>{
    res.render('crear', {titulo:'Crear Cliente'});
})



// construir archivo de objetos cliente
/* router.get('/', (req, res) =>  {
    res.render('clientes',{
       arrayClientes:[            {id:'x001',
           nombre:"agustin",            apellido:"quiceno",
           celular: 3245873136},

            {id:'x002',           
            nombre:"eliza",
            apellido:"guizao",            
            celular: 3245873136},
            
           {id:'x003',            
           nombre:"valeria",
           apellido:"qg",
           celular: 3245873136}
       ]
   })
        
 })*/


module.exports = router;