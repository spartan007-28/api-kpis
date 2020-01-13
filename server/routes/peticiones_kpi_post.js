const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();

const db = require('../config/db_conexion');

//POST

app.post('/agregar_kpi', (request, response) => {

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


    db.query('INSERT INTO kpi_hijos (id_padre, descripcion, area, meta, objetivo, unidades, periodo, numero_kpis, contador_kpis, anio, tipo_evaluacion, formula_datos, pregunta_uno, pregunta_dos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [id, des, area, meta, obj, unidades, periodo, numeroKPI, contador, anio, evaluacion, fd, p1, p2], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'KPI Agregado Correctamente' });
        }
    })
});


app.post('/addObjetivo', (request, response) => {
    let nombre = request.body.nombre_kpi_padre;

    db.query('INSERT INTO kpi_padres (nombre_kpi_padre) VALUES ($1)', [nombre], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'Objetivo Agregado Correctamente' });
        }
    })

})


app.post('/evaluation', (request, response) => {

    let tipo = request.body.tipo;
    let id = request.body.id_hijo;



    let r1 = request.body.resultado_p1;
    let r2 = request.body.resultado_p2;
    let rnumerico = request.body.resultado_n;
    let rdesicion = request.body.resultado_d;
    let estatus;
    let estatusnumerico;

    if (tipo === 'B') {
        if (rdesicion === 1) {
            estatus = 'CUMPLE';
            estatusnumerico = 1;
        } else {
            estatus = 'NO CUMPLE';
            estatusnumerico = 0;
        }
    } else {
        estatus = request.body.estatus;

        if (estatus === 'CUMPLE') {
            estatus = 'CUMPLE';
            estatusnumerico = 1;
        } else {
            estatus = 'NO CUMPLE';
            estatusnumerico = 0;
        }
    }


    db.query('INSERT INTO evaluaciones_kpi (id_hijo, resultado_p1, resultado_p2, resultado_numerico, resultado_desicion, estatus, estatus_numerico) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, r1, r2, rnumerico, rdesicion, estatus, estatusnumerico], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'KPI Hijo Agregado Correctamente' });
        }
    });


})

app.post('/agregar_usuario', (request, response) => {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let usuario = request.body.usuario;
    let pwd = bcrypt.hashSync(request.body.password);
    let userRole = request.body.user_role;
    let areaRole = request.body.role_area;
    let estatus = 'ACTIVO';

    db.query('INSERT INTO usuarios (nombre, apellido, usuario, password, role_user, area_role, estatus) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellidos, usuario, pwd, userRole, areaRole, estatus], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: 'Usuario Agregado' });
        }
    });

})


app.post('/add_obs', (request, response) => {
    let id = request.body.id;
    let obs = request.body.observacion;

    console.log(id);
    console.log(obs);

    db.query('INSERT INTO observaciones (id_obs_eva, observacion) VALUES ($1, $2)', [id, obs], (err, result) => {
        if (err) {
            response.send({ err });
        } else {
            response.send({ message: '¡Observacion Agregada!' });
        }
    });

})


module.exports = app;