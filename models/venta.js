const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ventaSchema = new Schema({
    cedula_cliente: String,
    codigo_venta: Number,
    detalle_venta: Number,
    ivaventa: Number,
    total_venta: Number,
    valor_venta: Number
});

//creacion del modelo
const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;