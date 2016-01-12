// pg implimentation of sql https://github.com/brianc/node-postgres

// we are using prepared statements here because its the fastest
// https://github.com/brianc/node-postgres/wiki/Prepared-Statements
// example:
// text, e.g. query( "select name from emp where emp_id=123" )
// paramaterized, e.g. query( "select name from emp where emp_id=$1", [123] )
// prepared, e.g. query( {name:"emp_name", text:"select name from emp where emp_id=$1", values:[123]} )

import Router from 'koa-router';
import query from '../../services/pg/query';
const logging = new Router({
  prefix: '/psql/logs',
});

function loggingRoutes(app) {
  logging

  .post('/', function* logSession() {
    const { sessionid, state, url } = this.request.body;
    const q = {};
    q.text = 'INSERT INTO wrenchsessions.session (sessionid, state, url) VALUES ($1, $2, $3) RETURNING id';
    q.values = [sessionid, state, url];
    q.name = 'insert';
    this.body = yield query(q);
  })

  .put('/:id', function* updateSession() {
    const id = this.params.id;
    const { url, state } = this.request.body;
    const q = {};
    q.text = 'UPDATE wrenchsessions.session SET url = $1, state = $2 WHERE id = $3';
    q.values = [url, state, id];
    q.name = 'update';
    this.body = yield query(q);
  })

  .delete('/:id', function* deleteSession() {
    const q = {};
    q.text = 'DELETE FROM wrenchsessions.session WHERE id = $1';
    q.values = [this.params.id];
    q.name = 'delete';
    this.body = yield query(q);
  })

  .get('/:sessionid', function* getSessionData() {
    const sessionid = this.params.sessionid;
    const { start, end } = this.query;
    const q = {};
    q.text = 'SELECT * FROM wrenchsessions.session WHERE sessionid = $1 AND inserted >= $2 AND inserted <= $3 ORDER BY inserted ASC';
    q.values = [sessionid, start || 0, end || 0];
    q.name = 'get';
    this.body = yield query(q);
  });

  app.use(logging.routes())
    .use(logging.allowedMethods());
}

export { loggingRoutes as default };
