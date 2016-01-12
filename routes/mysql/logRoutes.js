// node-mysql implimentation of query from https://github.com/felixge/node-mysql
import Router from 'koa-router';
import query from '../../services/mysql/query';
const logging = new Router({
  prefix: '/mysql/logs',
});

function loggingRoutes(app) {
  logging

  .post('/', function* logSession() {
    const { sessionid, url, state } = this.request.body;
    const q = {};
    q.sql = 'INSERT INTO ?? SET ?';
    q.values = ['session', { sessionid, url, state }];
    this.body = yield query(q);
  })

  .put('/:id', function* updateSession() {
    const id = this.params.id;
    const { url, state } = this.request.body;
    const q = {};
    q.sql = 'UPDATE ?? SET ? WHERE ?? = ?';
    q.values = [
      'session',
      { url, state },
      'id',
      id,
    ];
    this.body = yield query(q);
  })

  .delete('/:id', function* deleteSession() {
    const q = {};
    q.sql = 'DELETE FROM ?? WHERE ?? = ?';
    q.values = ['session', 'id', this.params.id];
    this.body = yield query(q);
  })

  .get('/:sessionid', function* getSessionData() {
    const sessionid = this.params.sessionid;
    const queryJson = this.query;
    const q = {};
    q.sql = 'SELECT * FROM ?? WHERE ?? = ? AND ?? BETWEEN ? AND ? ORDER BY ?? ASC';
    q.values = [
      'session',
      'sessionid',
      sessionid,
      'inserted',
      queryJson.start || 0,
      queryJson.end || 0,
      'inserted',
    ];
    this.body = yield query(q);
  });

  app.use(logging.routes())
    .use(logging.allowedMethods());
}

export { loggingRoutes as default };
