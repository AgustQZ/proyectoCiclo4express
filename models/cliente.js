//creacion del modelo de datos para clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clienteSchema = new Schema({
    nombre: String,
    apellidos: String,
    cel: Number
});

//creacion del modelo
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;