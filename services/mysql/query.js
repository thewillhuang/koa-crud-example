import { using } from 'bluebird';
import getConnection from './getConnection';

function query(q) {
  return using(getConnection(), connection => {
    return connection.queryAsync(q);
  }).then(data => {
    return data;
  }).catch(err => {
    return err;
  });
}

export { query as default };
