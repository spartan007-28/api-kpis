const Sequelize = require('sequelize');
const db = require('../config/db_conexion');

module.exports = db.sequelize.define(
    'kpi_s', {
        id_kpi: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        nombre_kpi: {
            type: Sequelize.STRING
        },
        descripcion_kpi: {
            type: Sequelize.STRING
        },
        area_kpi: {
            type: Sequelize.STRING
        },
        periodo_kpi: {
            type: Sequelize.STRING
        },
        numero_kpis: {
            type: Sequelize.INTEGER
        },
        fecha_kpi: {
            type: Sequelize.DATE
        },
        anio_kpi: {
            type: Sequelize.INTEGER
        },
        folio_kpi: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        resultado_estimado_kpi: {
            type: Sequelize.DOUBLE
        },
        resultado_real_general_kpi: {
            type: Sequelize.DOUBLE
        }
    }, {
        timestamps: false
    }
)