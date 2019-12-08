// get the client
const mysql = require('mysql2');
const prompts = require('prompts');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
  }],

  );
  pool.getConnection(function (err, conn) {
    // Do something with the connection
    conn.query(
      'SELECT city.name FROM city INNER JOIN country ON city.countryCode = country.code where country.name= ? and country.capital=city.id',
      response.countryName,
      function (err, results, fields) {
        console.log('The capital city for ' + response.countryName + ' is', results[0].name);
      }
    );
    pool.releaseConnection(conn);
  })

  pool.getConnection(function (err, conn) {
    // Do something with the connection
    conn.query(
      'Select cl.language from countrylanguage as cl inner join country as co on co.code=cl.countrycode where region=?',
      response.languagesSpoken,
      function (err, results, fields) {
        console.log('The List of languages spoken in the region ' + response.languagesSpoken + ' are', results);
      }
    )
    pool.releaseConnection(conn);
  })
})();

// create the connection to database


