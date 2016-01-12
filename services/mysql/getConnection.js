import pool from './pool';

export default function acquireConnection() {
  return pool.getConnectionAsync().disposer(connection => {
    connection.release();
  });
}
