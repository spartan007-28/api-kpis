const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3005;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//configuracion global de rutas
app.use(require('./routes/peticiones_kpi_post'));
app.use(require('./routes/peticiones_kpi_get'));
app.use(require('./routes/peticiones_kpi_put'));
app.use(require('./routes/peticiones_auth_kpis'));


app.listen(port, () => {
    console.log('Escuchando puerto: ', port);
});