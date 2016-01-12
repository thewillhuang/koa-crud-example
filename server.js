import koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import { port, env } from './config';
const app = koa();

// trust proxy headers
app.proxy = true;

// logging
if (env === 'development') {
  app.use(logger());
}

app.use(compress());

// parse body to json
app.use(bodyParser());

// routes
import mysqlLogRoutes from './routes/mysql/logRoutes';
mysqlLogRoutes(app);
import psqlLogRoutes from './routes/psql/logRoutes';
psqlLogRoutes(app);

// start server on defined port
app.listen(port);
console.log(`server listening on port ${port}`);

export default app;
