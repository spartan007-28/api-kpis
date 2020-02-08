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

app.get('/kpi_id/:id', (request, response) => {
    const id = request.params.id;
    db.query('SELECT * FROM kpi_hijos WHERE id_kpi_hijo = $1', [id], (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/search/:id', (request, response) => {
    const id = request.params.id;
    db.query('SELECT COUNT(*) FROM evaluaciones_kpi WHERE id_hijo = $1', [id], (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/numero_kpis', (request, response) => {
    db.query('SELECT kp.nombre_kpi_padre, COUNT(*) AS numero FROM kpi_hijos kh INNER JOIN kpi_padres kp ON kh.id_padre = kp.id_kpi_padre GROUP BY kp.nombre_kpi_padre', (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/lista_todos_kpis', (request, response) => {
    db.query('SELECT kh.id_kpi_hijo, kp.nombre_kpi_padre, kh.descripcion, kh.area, kh.meta, kh.objetivo, kh.unidades, kh.periodo, kh.anio, kh.formula_datos FROM kpi_hijos kh INNER JOIN kpi_padres kp ON kh.id_padre = kp.id_kpi_padre ORDER BY kh.id_kpi_hijo;', (err, result) => {
        if (err) throw err;
        //const datos = JSON.stringify(result.rows)
        response.json(result.rows);
    })
})

app.get('/objetivo_kpis', (request, response) => {
    db.query('SELECT * FROM kpi_padres ORDER BY id_kpi_padre ASC', (err, result) => {
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

    db.query('SELECT e.id_eva, kh.descripcion, e.estatus, e.resultado_numerico, e.resultado_desicion, e.fecha_hora FROM kpi_hijos kh INNER JOIN evaluaciones_kpi e ON kh.id_kpi_hijo = e.id_hijo WHERE kh.periodo = $1 AND e.id_hijo = $2 ORDER BY e.id_eva ASC', [periodo, folio], (err, result) => {
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

/*-----------------------------*/

app.get('/total_semanales', (request, response) => {
    let periodo = 'Semanal';

    db.query('SELECT kh.periodo, e.estatus, COUNT(*) AS numero FROM evaluaciones_kpi e INNER JOIN kpi_hijos kh ON kh.id_kpi_hijo = e.id_hijo WHERE kh.periodo = $1 GROUP BY kh.periodo, e.estatus;', [periodo], (err, result) => {
        if (err) throw err;
        response.json(result.rows);
    })
})

app.get('/total_mensual', (request, response) => {
    let periodo = 'Mensual';

    db.query('SELECT kh.periodo, e.estatus, COUNT(*) AS numero FROM evaluaciones_kpi e INNER JOIN kpi_hijos kh ON kh.id_kpi_hijo = e.id_hijo WHERE kh.periodo = $1 GROUP BY kh.periodo, e.estatus;', [periodo], (err, result) => {
        if (err) {
            throw err;
        } else if (result.rowCount === 0) {
            response.send({
                message: "No existen registros",
                status: 0
            })
        } else {
            response.json(result.rows);
        }

    })
})

app.get('/total_trimestral', (request, response) => {
    let periodo = 'Trimestral';

    db.query('SELECT kh.periodo, e.estatus, COUNT(*) AS numero FROM evaluaciones_kpi e INNER JOIN kpi_hijos kh ON kh.id_kpi_hijo = e.id_hijo WHERE kh.periodo = $1 GROUP BY kh.periodo, e.estatus;', [periodo], (err, result) => {
        if (err) {
            throw err;
        } else if (result.rowCount === 0) {
            response.send({
                message: "No existen registros",
                status: 0
            })
        } else {
            response.json(result.rows);
        }

    })
})

app.get('/total_semestral', (request, response) => {
    let periodo = 'Semestral';

    db.query('SELECT kh.periodo, e.estatus, COUNT(*) AS numero FROM evaluaciones_kpi e INNER JOIN kpi_hijos kh ON kh.id_kpi_hijo = e.id_hijo WHERE kh.periodo = $1 GROUP BY kh.periodo, e.estatus;', [periodo], (err, result) => {
        if (err) {
            throw err;
        } else if (result.rowCount === 0) {
            response.send({
                message: "No existen registros",
                status: 0
            })
        } else {
            response.json(result.rows);
        }

    })
})

app.get('/verificar_obs/:code', (request, response) => {
    let id = request.params.code;
    db.query('SELECT * FROM observaciones WHERE id_obs_eva = $1', [id], (err, result) => {
        if (err) {
            throw err;
        } else if (result.rowCount === 0) {
            response.send({
                message: "No existe ninguna observacion",
                status: 100
            })
        } else {
            response.send({
                message: "Existe una observacion",
                status: 200
            })
        }
    })
})

app.get('/mostrar_obs/:id', (request, response) => {
    let id = request.params.id;
    db.query('SELECT * FROM observaciones WHERE id_obs_eva = $1', [id], (err, result) => {
        if (err) {
            throw err;
        } else if (result.rowCount === 0) {
            response.send({
                message: "¡No existe ninguna observacion!",
                status: 100
            })
        } else {
            response.json(result.rows);
        }
    })
})

app.get('/info_kpi/:id', (request, response) => {
    const id = request.params.id;
    db.query('SELECT kp.nombre_kpi_padre, kh.area, kh.meta, kh.objetivo, kh.unidades, kh.periodo, kh.numero_kpis, kh.contador_kpis, kh.anio, kh.tipo_evaluacion, kh.formula_datos, kh.pregunta_uno, kh.pregunta_dos FROM kpi_padres kp INNER JOIN kpi_hijos kh ON kp.id_kpi_padre = kh.id_padre WHERE kh.id_kpi_hijo = $1', [id], (err, result) => {
        if (err) throw err;
        // console.log(err);
        response.json(result.rows)
    })
})

module.exports = app;