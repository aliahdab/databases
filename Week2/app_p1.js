// get the client
const mysql = require('mysql2');
const prompts = require('prompts');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
})

  (async () => {
    const response = await prompts({
      type: 'text',
      name: 'countryName',
      message: 'What is the country name?'
    });

    var inputCountryName = response.countryName;
  })();


// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function (err, results) {
    console.log(results);
  }
);
