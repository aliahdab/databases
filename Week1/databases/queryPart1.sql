﻿CREATE SCHEMA
IF NOT EXISTS world;
USE world;
SET AUTOCOMMIT
=0;
DROP TABLE IF EXISTS ´city´;
DROP TABLE IF EXISTS ´country´;

CREATE TABLE country
(
  id INT
  AUTO_INCREMENT ,
 name VARCHAR
  (30) NOT NULL UNIQUE,
 capital VARCHAR
  (30) NOT NULL ,
 population INT NOT NULL,
 PRIMARY KEY
  (id));

  CREATE TABLE city
  (
    id INT
    AUTO_INCREMENT,country_id INT NOT NULL,
    name VARCHAR
    (30) NOT NULL UNIQUE,
    population INT NOT NULL,
    codeNumber INT NOT NULL,
    PRIMARY KEY
    (id),
    FOREIGN KEY
    (country_id) REFERENCES country
    (id)
  );
    commit;

    INSERT INTO country
      (name,capital,population)
    values
      ('SWEDEN', 'Stockholm', 9000000),
      ('DENMARK', 'Denmark ', 8000000),
      ('FRANCE', 'Paris', 8000000),
      ('SPAIN', 'Madrid', 7000000),
      ('Syria', 'Damascus ', 25000000),
      ('Egypt', 'Cairo', 100000000),
      ('Germany', 'Berlin', 100000000);
    commit;
    INSERT INTO city
      (country_id,name,population,codeNumber)
    values
      (1, 'Malmo', 100000, 24356),
      (1, 'Växjö', 600000, 56445),
      (1, 'Kalmar', 800000, 56656),
      (3, 'Paris', 1200000, 24356),
      (1, 'karskrona', 60000, 5445),
      (1, 'Karlskrona', 344444, 56606),
      (2, 'Copenhagen', 800000, 45345),
      (5, 'Damascus', 10000000, 54678);

    SET AUTOCOMMIT
    =1;
