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
*/

// crear servidor con express
const express = require('express');
const app = express();
const port = 3444;
//escuchar el servidor
app.listen(port, () => {
    console.log(`Escuchando por el localhost:${port}`);
});
//llamar paginas estaticas
app.use(express.static(__dirname + '/public'));
// llamar la carpeta donde va a iniciar el proyecto
app.set('views', __dirname + '/views');
// crear el motor de plantillas
app.set('view engine', 'ejs');
/*llamar el modulo rutas
app.use(require('./routes/rutas')); --me sale error--*/
// RUTAS
app.get('/', (req, res) => {
    res.render('index', {titulo:'Login'});
});
app.get('/sucursales', (req, res) => {
    res.render('sucursales', {titulo:'Sucursales'});
});

// llamar a error 404 ejs
app.use((req, res, next) => {
    res.status(404).render('404');
});