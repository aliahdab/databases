// get the client
const mysql = require('mysql2');
const prompts = require('prompts');




(async () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
  })
  const response = await prompts([{
    type: 'text',
    name: 'countryName',
    language: 'languagesSpoken',
    message: 'What is the country name?',
  }, {
    type: 'text',
    name: 'languagesSpoken',
    message: 'What is the region? something like (" Nordic Countries")',
  }],

  );
  connection.query(
    'SELECT city.name FROM city INNER JOIN country ON city.countryCode = country.code where country.name= ? and country.capital=city.id',
    response.countryName,
    function (err, results, fields) {
      console.log('The capital city for ' + response.countryName + ' is', results[0].name);
    }
  );
})();




// create the connection to database


