const mysql = require('mysql');
const {
    promisify
} = require('util');

const {
    database
} = require('./keys');

const pool = mysql.createPool(database);
console.log('informacion de la base de datos:')
console.log(database)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
            console.error('La conexión a la base de datos fue cerrada');
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('La base de datos tiene muchas conexiones');

        if (err.code === 'ECONECTIONREFUSED')
            console.error('La conexión a la base de datos fue RECHAZADA');
    }
    if (connection) {
        connection.release();
        console.log('La conexión a la base de datos fue Exitosa')
        return;
    }
})

//promosify pool querys
pool.query = promisify(pool.query);

module.exports = pool;