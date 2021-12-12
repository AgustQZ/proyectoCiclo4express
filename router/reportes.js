const express = require('express');
const router = express.Router();

const Venta = require('../models/venta');
const Cliente = require('../models/cliente')

let cedula;

// llamar al router por medio de mongoose
router.get('/detalle', async(req, res) => {
    try {
        //guardar en array lo que encuentre en la base datos
        const arrayVentasDB = await Venta.find();
        const reporteTotal = arrayVentasDB.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find(elemento => elemento.cedula_cliente === valorActual.cedula_cliente);
            if (elementoYaExiste) {
                return acumulador.map((elemento) => {
                    if (elemento.cedula_cliente === valorActual.cedula_cliente) {
                        return {
                            ...elemento,
                            total_ventas: elemento.total_venta + valorActual.total_venta
                        }
                    }
                    return elemento;
                });
            }
            return [...acumulador, valorActual];
        }, []);
        console.log(reporteTotal, 'reporte total');
        for (let index = 0; index < reporteTotal.length; index++) {
            const element = reporteTotal[index].total_ventas;
            cedula = reporteTotal[index]._doc.cedula_cliente;
        }

        //mostrar por consola el array al abrir la pagina ejs
        //enrutar a la pagina ejs
        res.render("reportes", {
            //coge el array que viene de la db y lo descarga en la variable que lee el ejs
            arrayVentas: reporteTotal
        })
    } catch (error) {
        console.log(error)
    }
})

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
        res.render('reportes', {
            error: true
        })
    }
})


// router.get('/', async(req, res) => {
//     try {
//         //guardar en array lo que encuentre en la base datos
//         const arrayReportesDB = await Venta.find();
//         //mostrar por consola el array al abrir la pagina ejs
//         console.log(arrayReportesDB)
//             //enrutar a la pagina ejs
//         res.render("reportes", {
//             //coge el array que viene de la db y lo descarga en la variable que lee el ejs
//             arrayReportes: arrayReportesDB
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router;