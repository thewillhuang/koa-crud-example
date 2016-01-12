import { using } from 'bluebird';
import { getConnection } from './getConnections';

function query(sql) {
  return using(getConnection(), connection => {
    return connection.queryAsync(sql);
  }).then(data => {
    return data;
  }).catch(err => {
    return err;
  });
}

export { query as default };
