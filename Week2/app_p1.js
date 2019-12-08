// get the client
const mysql = require('mysql2');
const prompts = require('prompts');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});


(async () => {
  const response = await prompts([{
    type: 'text',
    name: 'countryName',
    message: 'What is the country name?',
  }, {
    type: 'text',
    name: 'languagesSpoken',
    message: 'What is the region? something like (" Nordic Countries")',
  },
  {
    type: 'text',
    name: 'numberCities',
    message: 'What is the language you want to search for?',
  }
  ],

  );
  connection.query(
    'SELECT city.name FROM city INNER JOIN country ON city.countryCode = country.code where country.name= ? and country.capital=city.id',
    response.countryName,
    function (err, results, fields) {
      console.log('The capital city for ' + response.countryName + ' is', results[0].name);
    }
  )
  connection.query(
    'Select cl.language from countrylanguage as cl inner join country as co on co.code=cl.countrycode where region=?',
    response.languagesSpoken,
    function (err, results, fields) {
      console.log('---------------------------------------------------------------------------')
      console.log('The List of languages spoken in the region ' + response.languagesSpoken + ' are', results);
    }
  )
  connection.query(
    'select count(city.name) as SUM from city inner join countrylanguage as cl on cl.countrycode=city.countrycode where cl.language=?',
    response.numberCities,
    function (err, results, fields) {
      console.log('---------------------------------------------------------------------------')
      console.log('The number of cities which speak ' + response.numberCities + ' is ', results[0]);
    }
  )


  connection.close
})();

// create the connection to database


