const { Pool } = require('pg')


const pool = new Pool({
    user: "postgres",
    host: "ti.aesantarita.com.mx",
    database: "aes_transporte",
    password: "xRw85w$92E",
    port: 5432
});

module.exports = pool;