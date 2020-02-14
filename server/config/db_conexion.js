const { Pool } = require('pg')


const pool = new Pool({
    user: "postgres",
    host: "ti.aesantarita.com.mx",
    database: "*********",
    password: "********",
    port: 5432
});

module.exports = pool;
