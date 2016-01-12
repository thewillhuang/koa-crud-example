## dockerized node server

### build the docker image
build the docker image from the given Dockerfile, tag the image with the name 'wrench-session-tracking'.
```
docker build -t 'wrench-session-tracking' .
```
### run the docker image
run the image wrench-session-tracking passing with environment variables in detached background mode. Asking docker to always restart if there is any crashes, connect node server listening port as defined by $PORT to the hostPort, finally, start the server by running: node index
```
docker run wrench-session-tracking -e [environment variables] -d --restart='always' -p hostPort:containerPort node index
```
### configurable environment variables
```
PORT
PGCONNECTIONSTRING
DATABASE
HOST
USER
PASSWORD
ENV
```
config.js contains all the configuration of the node server and accepts environment variables

### mysql or psql
given the potential amount of data for storage, i suggest mysql due to the below cheap, managed solutions from google and amazon which are both replicated, snapshotted, scaleable and pay as you go.

https://cloud.google.com/sql/

https://aws.amazon.com/rds/aurora/

### other potential solutions
amazon dynaomodb + s3 for json snapshot storage or sql + s3 but searching through the logs will be a more tasking job.
