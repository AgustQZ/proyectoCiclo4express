//creacion del modelo de datos para clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clienteSchema = new Schema({
    cedula: Number,
    nombre: String,
    direccion: String,
    telefono: Number,
    correoElectronico: String,
});

//creacion del modelo
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;