const util = require('util');
const mysql = require('mysql');
const mysql_import = require('mysql-import');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
})

const execQuery = util.promisify(connection.query.bind(connection));
async function seedDatabase() {

  const CREATE_WORLD_DATABASE = `CREATE DATABASE IF NOT EXISTS world`;
  const USE_TABLE_WORLD = `use world;`
  const DROP_CITY_TABLE = `DROP TABLE IF EXISTS city;`
  const DROP_COUNTRY_TABLE = `DROP TABLE IF EXISTS country;`

  const CREATE_COUNTRY_TABLE = `
  CREATE TABLE country
    (
      id INT AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL UNIQUE,
      capital VARCHAR(30) NOT NULL,
      population INT NOT NULL,
      PRIMARY KEY(id))`;

  const CREATE_CITY_TABLE = `
  CREATE TABLE city
  (
    id INT AUTO_INCREMENT,country_id INT NOT NULL,
    name VARCHAR(30) NOT NULL UNIQUE,
    population INT NOT NULL,
    codeNumber INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(country_id) REFERENCES country(id)
  );`

  const INSERT_TO_COUNTRY = `
  INSERT INTO country (name,capital,population)
  values
  ('SWEDEN', 'Stockholm', 9000000),
  ('DENMARK', 'Denmark ', 8000000),
  ('FRANCE', 'Paris', 8000000),
  ('SPAIN', 'Madrid', 7000000),
  ('Syria', 'Damascus ', 25000000),
  ('Egypt', 'Cairo', 100000000),
  ('Germany', 'Berlin', 100000000);`

  const INSERT_TO_CITY = `
  INSERT INTO city (country_id,name,population,codeNumber)
    values
      (1, 'Malmo', 100000, 24356),
      (1, 'Växjö', 600000, 56445),
      (1, 'Kalmar', 800000, 56656),
      (3, 'Paris', 1200000, 24356),
      (1, 'karskrona', 60000, 5445),
      (1, 'Karlskrona', 344444, 56606),
      (2, 'Copenhagen', 800000, 45345),
      (5, 'Damascus', 10000000, 54678);`

  const CREATE_DATABASE_NEW_WORLD = ` CREATE DATABASE IF NOT EXISTS NEW_WORLD;`

  const mydb_importer = mysql_import.config({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
    onerror: err => console.log(err.message)
  });

  try {
    // call the function that returns promise
    await execQuery(CREATE_WORLD_DATABASE);
    await execQuery(USE_TABLE_WORLD);
    await execQuery(DROP_CITY_TABLE);
    await execQuery(DROP_COUNTRY_TABLE);
    await execQuery(CREATE_COUNTRY_TABLE);
    await execQuery(CREATE_CITY_TABLE);
    await execQuery(INSERT_TO_COUNTRY);
    await execQuery(INSERT_TO_CITY);
    await execQuery(CREATE_DATABASE_NEW_WORLD);
    await mydb_importer.import('./databases/new_world.sql');
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();









