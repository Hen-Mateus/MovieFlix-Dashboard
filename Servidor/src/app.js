const express = require('express');
const app = express();

const filmesRouters = require('./routes/filmesRoute.js')

const generosRouters = require('./routes/generosRoute.js')

//Configurações
app.set('port', process.env.PORT || 3000);

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Middlewares
app.use(express.json());

//Rotas
app.use('/filmes', filmesRouters);

app.use('/generos', generosRouters);

app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'))
})