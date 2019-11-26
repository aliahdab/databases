//load our app server using express server somehow ...
const express = require('express');
const app = express();
const mysql = require('mysql');
const fs = require('fs');

fs.readFile('databases/new_world.sql', (err, data) => {
  if (err) throw err;
  console.log(data);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
})

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database is Connected!");
  connection.query("CREATE DATABASE IF NOT EXISTS world; use new_world", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});


app.get("/", (req, res) => {
  console.log("Push Data to the database")
})


app.get('/q1', (req, res) => {
  console.log('Question Number 1')
  console.log('What are the names of countries with population greater than 8 million')
  connection.query('SELECT name as CountryName,population as Population FROM country where population>8000000', (err, rows, fields) => {
    res.json(rows)
  })
})

app.get('/q2', (req, res) => {
  console.log('Question Number 2')
  console.log('What are the names of countries that have “land” in their names ?')
  connection.query('SELECT name as CountryName FROM country WHERE name LIKE "%land%"', (err, rows, fields) => {
    res.json(rows)
  })
})

app.get('/q3', (req, res) => {
  console.log('Question Number 3')
  console.log('What are the names of the cities with population in between 500,000 and 1 million ?')
  connection.query('SELECT name as CountryName,population FROM city WHERE population>500000 and population<1000000', (err, rows, fields) => {
    res.json(rows)
  })
})

app.get('/q4', (req, res) => {
  console.log('Question Number 4')
  console.log("What's the name of all the countries on the continent ‘Europe’ ?")
  connection.query("SELECT name FROM country WHERE continent='Europe'", (err, rows, fields) => {
    res.json(rows)
  })
})

app.get('/q5', (req, res) => {
  console.log('Question Number 5')
  console.log("List all the countries in the descending order of their surface areas.")
  connection.query("SELECT name as CountryName ,SurfaceArea FROM country order by SurfaceArea desc ", (err, rows, fields) => {
    res.json(rows)
  })
})

app.get('/q6', (req, res) => {
  console.log('Question Number 6')
  console.log("What are the names of all the cities in the Netherlands?")
  connection.query("SELECT name as CityName FROM country order by SurfaceArea desc ", (err, rows, fields) => {
    res.json(rows)
  })
})


// localhost:888
app.listen(888, () => {
  console.log("Server is up and listening on 888")
})