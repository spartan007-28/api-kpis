const Sequelize = require('sequelize');
const db = require('../config/db_conexion');

module.exports = (sequelize) => {
    const valor = db.sequelize.define(
        'kpi_semanal', {
            id_kpi_semanal: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            kpi_folio: {
                type: Sequelize.STRING
            },
            kpi_valor_entrada: {
                type: Sequelize.DOUBLE
            },
            kpi_meta: {
                type: Sequelize.DOUBLE
            },
            kpi_resultado: {
                type: Sequelize.DOUBLE
            },
        }, {
            timestamps: false
        }
    );
    valor.associate = (models) => {
        user.hasMany(models.kapi, { as: 'k' })
    };
    return valor;
}