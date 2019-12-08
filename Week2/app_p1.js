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
  }],

  );
  connection.query(            //1.What is the capital of country X ? (Accept X from user)
    'SELECT city.name FROM city INNER JOIN country ON city.countryCode = country.code where country.name= ? and country.capital=city.id',
    response.countryName,
    function (err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log('The capital city for ' + response.countryName + ' is', results[0].name);
      }
    }
  )
  connection.query(                  //2.List all the languages spoken in the region Y (Accept Y from user)
    'Select distinct(cl.language) from countrylanguage as cl inner join country as co on co.code=cl.countrycode where region=?',
    response.languagesSpoken,
    function (err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log('The List of languages spoken in the region ' + response.languagesSpoken + ' are', results);
      }
    }
  )
  connection.query(                      //3.Find the number of cities in which language Z is spoken (Accept Z from user)

    'select count(city.name) as SUM from city inner join countrylanguage as cl on cl.countrycode=city.countrycode where cl.language=?',
    response.numberCities,
    function (err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log('The number of cities which speak ' + response.numberCities + ' is ', results[0]);
      }
    }
  )

  connection.query(                         //4.List all the continents with the number of languages spoken in each continent
    'SELECT country.continent, COUNT(distinct(countrylanguage.language)) as LanguagesNumber FROM country INNER JOIN countrylanguage ON country.code = countrylanguage.countrycode GROUP BY country.continent',
    function (err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log('The continents with the number of languages spoken in each continent', results);
      }
    }
  )


  // connection.query(                          //5. List countries with same official language in same region
  //   'select c.name,c.region,l.language from country as c inner join countrylanguage as l on c.code=l.countrycode where l.isofficial ="T" order by c.region, l.language',
  //   function (err, results) {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log('List countries with same official language in same region', results);
  //     }
  //   }
  // )

  connection.close
})();


