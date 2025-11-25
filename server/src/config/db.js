const mysql = require('mysql2'); // <- use promise version

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'er_hospital_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise(); // wrap it
module.exports = { pool: promisePool };