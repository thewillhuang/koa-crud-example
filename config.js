const {
  PORT = 3001,
  USER_NAME = 'willh',
  PGCONNECTIONSTRING = `postgres://${USER_NAME}@localhost/${USER_NAME}`,
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

console.log(env, connectionString, mysqldb, port);

export {
  env,
  connectionString,
  mysqldb,
  port,
};
