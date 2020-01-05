const express = require('express');
const app = express();

const db = require('../config/db_conexion');

app.get('/lista_kpis', (request, response) => {
    db.query('SELECT * FROM kpi_s', (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/lista_todos_kpis', (request, response) => {
    db.query('select kc.id_kpi_c, kc.folio_kpi_c, kr.nombre_objetivo, kc.descripcion, kc.medicion, kc.evidencia, kc.periodo, kc.area,  kc.meta_real, kc.evaluacion FROM kpi_root kr INNER JOIN kpi_child kc ON kr.id_kpi = kc.id_kpi_r ORDER BY kc.folio_kpi_c ASC', (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/objetivo_kpis', (request, response) => {
    db.query('SELECT * FROM kpi_padres', (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/ultimo_registro_kpi', (request, response) => {
    db.query('SELECT * FROM kpi_child ORDER BY id_kpi_c DESC LIMIT 1', (err, result) => {
        if (err) throw err;
        response.json(result.rows)
    });
})

app.get('/lista_kpis_monitoreo', (request, response) => {
    const area = 'Monitoreo y Seguridad Patrimonial';
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.periodo, kh.tipo_evaluacion, kh.objetivo, kh.numero_kpis, kh.contador_kpis, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.area = $1 ORDER BY kh.id_kpi_hijo ASC', [area], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/lista_kpis_logistica', (request, response) => {
    const area = 'Logistica';
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.periodo, kh.tipo_evaluacion, kh.objetivo, kh.numero_kpis, kh.contador_kpis, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.area = $1 ORDER BY kh.id_kpi_hijo ASC', [area], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/lista_kpis_sistemas', (request, response) => {
    const area = 'Sistemas';
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.periodo, kh.tipo_evaluacion, kh.objetivo, kh.numero_kpis, kh.contador_kpis, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.area = $1 ORDER BY kh.id_kpi_hijo ASC', [area], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/lista_kpis_mantenimiento', (request, response) => {
    const area = 'Mantenimiento';
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.periodo, kh.tipo_evaluacion, kh.objetivo, kh.numero_kpis, kh.contador_kpis, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.area = $1 ORDER BY kh.id_kpi_hijo ASC', [area], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/lista_kpis_rh', (request, response) => {
    const area = 'Recursos Humanos';
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.periodo, kh.tipo_evaluacion, kh.objetivo, kh.numero_kpis, kh.contador_kpis, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.area = $1 ORDER BY kh.id_kpi_hijo ASC', [area], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/lista_kpis_admin', (request, response) => {
    const area = 'Administración';
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.periodo, kh.tipo_evaluacion, kh.objetivo, kh.numero_kpis, kh.contador_kpis, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.area = $1 ORDER BY kh.id_kpi_hijo ASC', [area], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/kpi/:folio_kpi/:periodo_kpi', (request, response) => {
    let folio = request.params.folio_kpi;
    let periodo = request.params.periodo_kpi;
    console.log(folio);
    console.log(periodo);

    db.query('SELECT e.id_eva, kh.descripcion, e.estatus FROM kpi_hijos kh INNER JOIN evaluaciones_kpi e ON kh.id_kpi_hijo = e.id_hijo WHERE kh.periodo = $1 AND e.id_hijo = $2 ORDER BY e.id_eva ASC', [periodo, folio], (err, result) => {
        if (err) throw err;
        response.json(result.rows)
    })
})

app.get('/getEvaluation/:id', (request, response) => {
    let id = request.params.id;
    console.log(id);

    db.query('SELECT e.id_eva, kh.tipo_evaluacion, kh.formula_datos, kh.objetivo, kh.pregunta_uno, kh.pregunta_dos FROM evaluaciones_kpi e INNER JOIN kpi_hijos kh ON e.id_hijo = kh.id_kpi_hijo WHERE id_eva = $1', [id], (err, result) => {
        if (err) throw err;
        response.json(result.rows)
    })
})

app.get('/all_users', (request, response) => {

    db.query('SELECT nombre, apellido, usuario, role_user, area_role, estatus FROM usuarios', (err, result) => {
        if (err) throw err;
        response.json(result.rows)
    })
})

module.exports = app;