const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ventaSchema = new Schema({
    nombreCliente: String,
    cedulaCliente: String,
    codigoProducto: Number
});

//creacion del modelo
const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;