-- -----------------------------------------------------
-- Schema wrenchsessions
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS wrenchsessions CASCADE;
-- -----------------------------------------------------
-- Schema wrenchsessions
-- -----------------------------------------------------
CREATE SCHEMA wrenchsessions;

-- -----------------------------------------------------
-- Table wrenchsessions.session
-- -----------------------------------------------------
DROP TABLE IF EXISTS wrenchsessions.session ;

CREATE TABLE wrenchsessions.session (
  id SERIAL PRIMARY KEY,
  sessionid TEXT NOT NULL,
  inserted TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state TEXT NOT NULL,
  url TEXT NOT NULL
) WITH ( OIDS = FALSE );
