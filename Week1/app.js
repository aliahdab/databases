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


app.get('/q1', (req, res) => {
  console.log('Question Number 1')
  console.log('What are the names of countries with population greater than 8 million')
  connection.query('SELECT name,population FROM country where population>8000000', (err, rows, fields) => {
    res.json(rows)
  })
})

app.get('/q2', (req, res) => {
  console.log('Question Number 2')
  console.log('What are the names of countries that have “land” in their names ?')
  connection.query('SELECT name FROM country', (err, rows, fields) => {
    res.json(rows)
  })
})




app.get("/", (req, res) => {
  console.log("responding to root route")
  res.send("Hello from Rooooooooooot")
})


app.get('/users', (req, res) => {
  const user1 = { firstname: "Ali", lastname: "Ahdab" }
  const user2 = { firstname: "Jon", lastname: "Kery" }
  res.json([user1, user2])
})


// localhost:888
app.listen(888, () => {
  console.log("Server is up and listening om 888")
})