const express = require('express');
const app = express();

const db = require('../config/db_conexion');


app.get('/kpi_graf/:id', (resquest, response) => {
    const id = resquest.params.id;
    console.log(id);
    db.query('SELECT resultado_numerico FROM evaluaciones_kpi WHERE id_hijo = $1 ORDER BY id_eva ASC', [id], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
        console.log(result.rows);
    })
})

app.get('/kpi_objetivo/:id', (resquest, response) => {
    const id = resquest.params.id;
    db.query('SELECT objetivo, contador_kpis FROM kpi_hijos WHERE id_kpi_hijo = $1', [id], (err, result) => {
        if (err) throw err;

        response.json(result.rows);
    })
})


module.exports = app;