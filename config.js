const {
  PORT = 3001,
  PGCONNECTIONSTRING = 'postgres://willh@localhost/willh',
  NODE_ENV = 'development',
  DATABASE = 'wrenchsessions',
  HOST = 'localhost',
  MYSQLUSER = 'root',
  PASSWORD = '',
} = process.env;
const port = PORT;
const connectionString = PGCONNECTIONSTRING;
const env = NODE_ENV;
const mysqldb = {
  database: DATABASE,
  connectionLimit: 100,
  host: HOST,
  user: MYSQLUSER,
  password: PASSWORD,
  // ssl: 'Amazon RDS',
};

export {
  env,
  connectionString,
  mysqldb,
  port,
};
