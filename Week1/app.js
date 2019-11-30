//load our app server using express server somehow ...
const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
})

app.get("/", (req, res) => {
  const sqlQuery1 = 'create database if not exists world';
  const sqlQuery2 = 'use world';
  const sqlQuery3 = 'DROP TABLE IF EXISTS city';
  const sqlQuery4 = 'CREATE TABLE city(ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,Name VARCHAR(255),CountryCode VARCHAR(255),Population INT,)';
  const sql = [sqlQuery1, sqlQuery2, sqlQuery3, sqlQuery4];
  res.send("Hello Alooosh >>>> here you can find the answer for week1 database questions")
  sql.forEach(q => connection.query(q, (err, rows, fields) => {
    if (err) { throw err; }
  }))
})

// localhost:888
app.listen(888, () => {
  console.log("Server is up and listening on 888")
})


app.get('/q1', (req, res) => {
  connection.query('SELECT name as CountryName,population as Population FROM country where population>8000000', (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q2', (req, res) => {

  connection.query('SELECT name as CountryName FROM country WHERE name LIKE "%land%"', (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q3', (req, res) => {
  connection.query('SELECT name as CountryName,population FROM city WHERE population>500000 and population<1000000', (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q4', (req, res) => {
  connection.query("SELECT name FROM country WHERE continent='Europe'", (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q5', (req, res) => {
  connection.query("SELECT name as CountryName ,SurfaceArea FROM country order by SurfaceArea desc ", (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q6', (req, res) => {
  connection.query('SELECT c.name FROM city as c join country as co on c.CountryCode = co.Code WHERE co.name = "Netherlands" ', (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q7', (req, res) => {
  connection.query("SELECT name,population FROM city where name='Rotterdam' ", (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q8', (req, res) => {
  connection.query("SELECT name,SurfaceArea FROM country order by SurfaceArea desc LIMIT 10", (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})

app.get('/q9', (req, res) => {
  connection.query("SELECT name,population FROM city order by population desc LIMIT 10", (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })

})

app.get('/q10', (req, res) => {
  connection.query("select sum(population) as Population_OF_The_World_is from country", (err, rows, fields) => {
    if (err) { throw err; }
    res.json(rows)
  })
})


