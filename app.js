/*  IMPORTANTE!!
    en la terminal
    npm init --yes (para iniciar un projecto con node)
    npm install express (para instalar el framework)
    npm install ejs (para instalar las plantillas ejs)
    npm install -g nodemon (para reiniciar automaticamente el servidor cada vez que guardes cambios)
    nodemon app.js (para ejecutar la aplicacion)
    luego ir al navegaro y escribir localhost:"mas el numero del puerto"
    Nota:
    para importar el proyecto solo necesitas instalar express y listo
    nota2:
    ir a package.json y crear los scripts "start": "node app" y "dev": "nodemon app"
    npm i mongoose es el driver para realizar la conexion a mongodb
    npm i body-parser sirve para transportar los datos de los inputs
    VALIDACION DE LOGIN
    npm i passport passport-local cookie-parser express-session 
*/

// crear servidor con express
const express = require('express');
//libreria de autenticacion de usuarios
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const port = 3444;
//para guardar datos en el navegador
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local').Strategy;
const { Passport } = require('passport');


//para leer los datos enviados del formulario
app.use(express.urlencoded({extended: true}));
//usar paquetes para que express pueda usar sesiones
app.use(cookieParser('mi mas grande secreto'));
app.use(session({
    secret: 'mi mas grande secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//instancia del objeto strategy para enviar el resultado del proceso de autenticacion
passport.use(new passportLocal(function (username, password, done){
    if(username === "admininicial" && password === "admin123456")
    //crear el objeto de no haber errores
    return done (null, {id: 1, name: "Agus"});

    done(null, false);
}));
//serializar el usuario para guardarlo
passport.serializeUser(function(user, done){
    done(null, user.id);
});
//deserializar el usuario guardado
passport.deserializeUser(function(id,done){
    //retornar el objeto
    done(null, {id: 1, name: "Agus"})
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//escuchar el servidor
app.listen(port, () => {
    console.log(`Escuchando por el localhost:${port}`);
});

//Crear la conexion a la base de datos mongodb usando mongoose (npm i mongoose para instalar)
const mongoose = require('mongoose');
const uri = `mongodb://localhost:27017/tienda`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexion a mongodb establecida'))
    .catch(e => console.log('Error de conexion', e));

//llamar paginas estaticas
app.use(express.static(__dirname + '/public'));
// llamar la carpeta donde va a iniciar el proyecto
app.set('views', __dirname + '/views');
// crear el motor de plantillas
app.set('view engine', 'ejs');

//      RUTAS
//modulo rutas
app.use('/', require('./router/rutas'));
//modulo archivo de datos clientes
app.use('/clientes', require('./router/clientes'));

//modulo archivo de datos productos
app.use('/productos',require('./router/productos'));

// llamar a error 404 ejs
app.use((req, res, next) => {
    res.status(404).render('404');
});

