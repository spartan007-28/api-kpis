const express = require('express');
const app = express();

const db = require('../config/db_conexion');

app.put('/update_evaluacion', (request, response) => {

    let id = request.body.id_eva;
    let resultado = request.body.resultado_d;
    let tipo = request.body.tipo;

    console.log(id);
    console.log(resultado);
    console.log(tipo);


    if (resultado === 1) {
        estatus = 'CUMPLE';
        estatusnumerico = 1

        db.query('UPDATE evaluaciones_kpi SET resultado_desicion = $1, estatus = $2, estatus_numerico = $3 WHERE id_eva = $4', [resultado, estatus, estatusnumerico, id], (err, result) => {
            if (err) {
                response.send({ err });
            } else {
                response.send({ message: 'Evaluación Actualizada' });
            }
        })

    } else if (resultado === 0) {
        estatus = 'NO CUMPLE';
        estatusnumerico = 0;

        db.query('UPDATE evaluaciones_kpi SET resultado_desicion = $1, estatus = $2, estatus_numerico = $3 WHERE id_eva = $4', [resultado, estatus, estatusnumerico, id], (err, result) => {
            if (err) {
                response.send({ err });
            } else {
                response.send({ message: 'Evaluación Actualizada' });
            }
        })

    } else {
        response.send({ error: 400 })
    }
});

app.put('/update_evaluacion_numerica', (request, response) => {
    //const datos = `{ "id_eva": ${ id }, "tipo": "A", "resultado_p1": ${ c1 }, "resultado_p2": ${ c2 }, "resultado_n": ${ resultCon }, "estatus": "${ res }" }`;
    let id = request.body.id_eva;
    let r1 = request.body.resultado_p1;
    let r2 = request.body.resultado_p2;
    let resultado = request.body.resultado_n;
    let estatus = request.body.estatus;
    let tipo = request.body.tipo;

    console.log(id);
    console.log(resultado);
    console.log(tipo);


    if (estatus === 'CUMPLE') {
        estatusnumerico = 1
    } else {
        estatusnumerico = 0;
    }

    db.query('UPDATE evaluaciones_kpi SET resultado_p1 = $1, resultado_p2 = $2, resultado_numerico = $3, estatus = $4, estatus_numerico = $5 WHERE id_eva = $6', [r1, r2, resultado, estatus, estatusnumerico, id], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'Evaluación Actualizada' });
        }
    })
});

app.put('/update_objetivo', (request, response) => {
    //const datos = `{ "id_eva": ${ id }, "tipo": "A", "resultado_p1": ${ c1 }, "resultado_p2": ${ c2 }, "resultado_n": ${ resultCon }, "estatus": "${ res }" }`;
    let id = request.body.id;
    let nombre_obj = request.body.nombre;

    console.log(id);
    console.log(nombre_obj);

    db.query('UPDATE kpi_padres SET nombre_kpi_padre = $1 WHERE id_kpi_padre = $2', [nombre_obj, id], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'Objetivo Actualizado' });
        }
    })
});

app.put('/update_observacion', (request, response) => {
    //const datos = `{ "id_eva": ${ id }, "tipo": "A", "resultado_p1": ${ c1 }, "resultado_p2": ${ c2 }, "resultado_n": ${ resultCon }, "estatus": "${ res }" }`;
    let id = request.body.id;
    let obs = request.body.observacion;

    // console.log(id);
    // console.log(obs);

    db.query('UPDATE observaciones SET observacion = $1 WHERE id_obs_eva = $2', [obs, id], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: '¡Actualizada Correctamente!' });
        }
    })
});

module.exports = app;