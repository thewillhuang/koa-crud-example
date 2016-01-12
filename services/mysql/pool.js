import { mysqldb } from '../../config';
import { promisifyAll } from 'bluebird';
import { createPool } from 'mysql2';
import Pool from 'mysql2/lib/pool';
import Connection from 'mysql2/lib/connection';

// default implimentation of mysql with callbacks

// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'example.org',
//   user            : 'bob',
//   password        : 'secret'
// });
//
// pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//
//   console.log('The solution is: ', rows[0].solution);
// });

// promisify mysql with bluebird
promisifyAll([Pool, Connection]);
const pool = createPool(mysqldb);
export { pool as default };
