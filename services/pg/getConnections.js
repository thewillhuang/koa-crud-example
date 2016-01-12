import pg from 'pg';
import { promisifyAll } from 'bluebird';
import { connectionString } from '../../config';

// default callback based implimentation
// var pg = require('pg');
// var conString = "postgres://username:password@localhost/database";
//
// //this initializes a connection pool
// //it will keep idle connections open for a (configurable) 30 seconds
// //and set a limit of 20 (also configurable)
// pg.connect(conString, function(err, client, done) {
//   if(err) {
//     return console.error('error fetching client from pool', err);
//   }
//   client.query('SELECT $1::int AS number', ['1'], function(err, result) {
//     //call `done()` to release the client back to the pool
//     done();
//
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].number);
//     //output: 1
//   });
// });

// promisify pg with bluebird
promisifyAll(pg, {
  filter(methodName) {
    return methodName === 'connect';
  },
  multiArgs: true,
});
promisifyAll(pg);

function getConnection(conString = connectionString) {
  let close;
  return pg.connectAsync(conString).spread((client, done) => {
    close = done;
    return client;
  }).disposer(() => {
    if (close) close();
  });
}

// // impliment connection with no connection leaks
// import { using } from 'bluebird';
// using(getConnection(), connection => {
//   // use client here and _return the promise_
//   return connection.queryAsync({
//     name: 'select table',
//     text: 'SELECT * FROM users WHERE name = $1',
//     values: ['william'],
//   });
// }).then(result => {
//   // client connection returned to pool
//   // do something
//   console.log(result);
// });

function getTransaction(conString = connectionString) {
  let close;
  return pg.connectAsync(conString).spread((client, done) => {
    close = done;
    return client.queryAsync('BEGIN').then(() => {
      return client;
    });
  }).disposer((client, promise) => {
    function closeClient() {
      if (close) close(client);
    }
    return promise.isFulfilled()
    ? client.queryAsync('COMMIT').then(closeClient)
    : client.queryAsync('ROLLBACK').then(closeClient);
  });
}

// // impliment transaction with automatic rollback on any errors
// import { using } from 'bluebird';
// const sql = 'transaction 1';
// const sql2 = 'transaction 2';
// const sql3 = 'transaction 3';
// using(getTransaction(), tx => {
//   return tx.queryAsync(sql).then(() => {
//     return tx.queryAsync(sql2);
//   }).then(() => {
//     return tx.queryAsync(sql3);
//   });
// });

export {
  getConnection,
  getTransaction,
};
