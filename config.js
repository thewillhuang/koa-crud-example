const {
  PORT = 3001,
  USER_NAME = 'willh',
  NODE_ENV = 'development',
  DATABASE = 'wrenchsessions',
  HOST = 'localhost',
  USER = 'root',
  PASSWORD = '',
  PGCONNECTIONSTRING = `postgres://${USER_NAME}@${HOST}/${USER_NAME}`,
} = process.env;

const port = PORT;
const connectionString = PGCONNECTIONSTRING;
const env = NODE_ENV;
const mysqldb = {
  database: DATABASE,
  connectionLimit: 100,
  host: HOST,
  user: USER,
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
