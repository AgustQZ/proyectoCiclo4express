//creacion del modelo de datos para clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productoSchema = new Schema({
  codigo_producto: String,
  nombre_producto: String,
  nitproveedor: String,
  precio_compra: Number,
  ivacompra: Number,
  precio_venta: Number
});

//creacion del modelo
const Producto = mongoose.model('Producto',productoSchema);

module.exports = Producto;