// get the client
const mysql = require('mysql2');
const prompts = require('prompts');



(async () => {
  const response = await prompts({
    type: 'text',
    name: 'countryName',
    message: 'What is the country name?',

  });

  let countryName = response.countryName;
  connection.query(
    'SELECT city.name FROM city INNER JOIN country ON city.countryCode = country.code where country.name= ?',
    countryName,
    function (err, results, fields) {
      console.log(results[0]); // results contains rows returned by server
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


