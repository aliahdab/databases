//load our app server using express server somehow ...
const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
})


// localhost:888
app.listen(888, () => {
  console.log("Server is up and listening on 888")
})





