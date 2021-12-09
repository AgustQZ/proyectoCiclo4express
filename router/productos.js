const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
var multer = require('multer');
var csv = require('csvtojson');

router.get('/', async(req, res) => {
    try {
        //guardar en array lo que encuentre en la base datos
        const arrayProductosDB = await Producto.find();
        //mostrar por consola el array al abrir la pagina ejs
        //enrutar a la pagina ejs
        res.render("productos", {
            //coge el array que viene de la db y lo descarga en la variable que lee el ejs
            arrayProductos: arrayProductosDB
        })
    } catch (error) {
        console.log(error)
    }
})

var storage = multer.diskStorage({ dest: 'uploads/' });

var temp;
var uploads = multer({ storage: storage });

router.post('/', uploads.single('Productos'), (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
            for (var x = 0; x < jsonObj; x++) {
                temp = parseInt(jsonObj[x].codigo_producto)
                jsonObj[x].codigo_producto = temp;
                temp = jsonObj[x].nombre_producto
                jsonObj[x].nombre_producto = temp;
                temp = parseInt(jsonObj[x].nitproveedor)
                jsonObj[x].nitproveedor = temp;
                temp = parseInt(jsonObj[x].precio_compra)
                jsonObj[x].precio_compra = temp;
                temp = parseInt(jsonObj[x].ivacompra)
                jsonObj[x].ivacompra = temp;
                temp = parseInt(jsonObj[x].precio_venta)
                jsonObj[x].precio_venta = temp;
            }
            Producto.insertMany(jsonObj, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/productos');
                }
            });
        });
});

module.exports = router;