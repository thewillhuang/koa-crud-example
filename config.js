const port = process.env.PORT || 3001;
// 'postgres://username:password@localhost:port/database';
const connectionString = process.env.PGCONNECTIONSTRING
  || 'postgres://willh@localhost/willh';
const env = process.env.NODE_ENV || 'development';
const mysqldb = {
  database: process.env.DATABASE || 'wrenchsessions',
  connectionLimit: 100,
  // aws rds
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'root',
  // password: process.env.PASSWORD || '',
  // ssl: 'Amazon RDS',
};

export {
  env,
  connectionString,
  mysqldb,
  port,
};
