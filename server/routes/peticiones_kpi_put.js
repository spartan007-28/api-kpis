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

app.put('/actualizar_kpi', (request, response) => {

    let tipo = request.body.tipo;

    console.log(tipo);

    if (tipo === 'completa') {
        let id_k = request.body.id_kpi_hijo;
        let id = request.body.id_padre;
        let des = request.body.descripcion;
        let fd = request.body.formula_datos;
        let obj = request.body.objetivo;
        let meta = request.body.meta;
        let area = request.body.area;
        let periodo = request.body.periodo;

        let numeroKPI;

        //console.log(nombre_objetivo);

        if (periodo == 'Semanal') {
            numeroKPI = 52;
        } else if (periodo == 'Mensual') {
            numeroKPI = 12;
        } else if (periodo == 'Trimestral') {
            numeroKPI = 4;
        } else if (periodo == 'Semestral') {
            numeroKPI = 2;
        } else if (periodo == 'Anual') {
            numeroKPI = 1;
        }

        let contador = 0;
        let evaluacion = request.body.tipo_evaluacion;
        let unidades = request.body.unidades;
        let anio = request.body.anio;
        let p1 = request.body.pregunta_uno;
        let p2 = request.body.pregunta_dos;

        db.query('UPDATE kpi_hijos SET id_padre = $1, descripcion = $2, area = $3, meta = $4, objetivo = $5, unidades = $6, periodo = $7, numero_kpis = $8, anio = $9, tipo_evaluacion = $10, formula_datos = $11, pregunta_uno = $12, pregunta_dos = $13 WHERE id_kpi_hijo = $14', [id, des, area, meta, obj, unidades, periodo, numeroKPI, anio, evaluacion, fd, p1, p2, id_k], (err, result) => {
            if (err) {
                console.log(err);
                response.send({ err });
            } else {
                response.send({ message: 'KPI Actualizado Correctamente' });
            }
        })

    } else {
        console.log('In');
        let id_k = request.body.id_kpi_hijo;
        let id = request.body.id_padre;
        let des = request.body.descripcion;
        let fd = request.body.formula_datos;
        let meta = request.body.meta;
        let area = request.body.area;

        let anio = request.body.anio;
        let p1 = request.body.pregunta_uno;
        let p2 = request.body.pregunta_dos;

        db.query('UPDATE kpi_hijos SET id_padre = $1, descripcion = $2, area = $3, meta = $4, anio = $5, formula_datos = $6, pregunta_uno = $7, pregunta_dos = $8 WHERE id_kpi_hijo = $9', [id, des, area, meta, anio, fd, p1, p2, id_k], (err, result) => {
            if (err) {
                console.log(err);
                response.send({ err });
            } else {
                response.send({ message: 'KPI Actualizado Correctamente' });
            }
        })
    }
});

module.exports = app;