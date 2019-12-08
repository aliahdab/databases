// get the client
const mysql = require('mysql2');
const prompts = require('prompts');



(async () => {
  const response = await prompts({
    type: 'text',
    name: 'countryName',
    message: 'What is the country name?'
  });

  let countryName = response.countryName;
  connection.query(
    'SELECT capital FROM `country` WHERE `name` = ?',
    countryName,
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
})();

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
})


