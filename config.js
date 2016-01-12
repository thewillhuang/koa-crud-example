const port = process.env.PORT || 3001;
// 'postgres://username:password@localhost/database';
const connectionString = process.env.PGCONNECTIONSTRING
  || 'postgres://willh@localhost/willh';
const env = process.env.NODE_ENV || 'development';
const mysqldb = {
  database: process.env.DATABASE || 'wrenchsessions',
  connectionLimit: 100,
  // // aws rds
  // host: process.env.HOST || 'procore.mvp0120.us-west-2.rds.amazonaws.com',
  // user: process.env.USER || 'user',
  // password: process.env.PASSWORD || 'pw',
  // ssl: 'Amazon RDS',
  // localhost
  host: 'localhost',
  user: 'root',
};

export {
  env,
  connectionString,
  mysqldb,
  port,
};
