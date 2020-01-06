const express = require('express');
const app = express();

const db = require('../config/db_conexion');

app.delete('/delete_kpi/:id', (request, response) => {

    let id = request.params.id;

    db.query('DELETE FROM kpi_hijos WHERE id_kpi_hijo = $1', [id], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'KPI Eliminado Correctamente' });
        }
    })
})

module.exports = app;