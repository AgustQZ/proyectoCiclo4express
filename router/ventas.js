const express = require('express');
const router = express.Router();

// solicitar la venta en el modelo
const Venta = require('../models/venta');
const Cliente = require('../models/cliente');
const Producto = require('../models/producto');

// llamar al router por medio de mongoose y traer los datos de la bd
router.get('/', async(req, res) => {
    try {
        //guardar en array lo que encuentre en la base datos
        const arrayVentasDB = await Venta.find();
        //mostrar por consola el array al abrir la pagina ejs
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
router.post('/', async(req, res) => {
    const body = req.body
    let venta = {
        cedula_cliente: body.cedula_cliente,
        detalle_venta: [{
                cantidad_producto: body.cantidad_producto1,
                codigo_producto: body.codigo_producto1,
                valor_total: Number(body.valor_total),
                valoriva: (Number(body.ivaP1) / 100) * (Number(body.valor_total)),
                valor_venta: Number(body.valor_total) + ((Number(body.ivaP1) / 100) * (Number(body.valor_total)))
            }, {
                codigo_producto: body.codigo_producto2,
                codigo_producto: body.codigo_producto2,
                valor_total: Number(body.valor_total2),
                valoriva: (Number(body.ivaP2) / 100) * (Number(body.valor_total2)),
                valor_venta: Number(body.valor_total2) + ((Number(body.ivaP2) / 100) * (Number(body.valor_total2))),
            },
            {
                codigo_producto: body.codigo_producto3,
                codigo_producto: body.codigo_producto3,
                valor_total: Number(body.valor_total3),
                valoriva: (Number(body.ivaP3) / 100) * (Number(body.valor_total3)),
                valor_venta: Number(body.valor_total3) + ((Number(body.ivaP3) / 100) * (Number(body.valor_total3))),
            }
        ],
        valor_venta: Number(body.valor_venta),
        ivaventa: Number(body.ivaventa),
        total_venta: Number(body.total_venta),
    }
    try {
        //primer metodo para enviar los datos y crear una venta en la bd
        // nota: esta Venta es la que se llamo en la linea 5

        const ventaDB = new Venta(venta)
        await ventaDB.save()
            //redireccionar despues de enviar los datos
        res.redirect('ventas')
    } catch (error) {
        console.log('error', error)
    }
})


//Búsqueda de cliente por cédula
router.get('/cliente/:cedula', async(req, res) => {
    const cedula = req.params.cedula
    try {
        const clienteDB = await Cliente.findOne({
            cedula: cedula
        })
        console.log(clienteDB)
        res.json({
            cliente: clienteDB,
            error: false

        })
    } catch (error) {
        res.render('ventas', {
            error: true
        })
    }
})

router.get('/producto/:codigo_producto', async(req, res) => {
    const codigo_producto = req.params.codigo_producto
    try {
        const productoDB = await Producto.findOne({
            codigo_producto: codigo_producto
        })
        console.log(productoDB)
        res.json({
            producto: productoDB,
            error: false

        })
    } catch (error) {
        res.render('ventas', {
            error: true
        })
    }
})

module.exports = router;