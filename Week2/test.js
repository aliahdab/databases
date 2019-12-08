const mysql = require('mysql2');
const express = require('express');
const prompt = require('prompt');
const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

var prompt_attributes = [{
  name: 'country',
  validator: /^[a-zA-Z\s\-]+$/,
  warning: 'Username is not valid, it can only contains letters, spaces, or dashes'
},
{
  name: 'region'
},
{
  name: 'spokenlanguage'
},
{
  name: 'officialLanguage'
},
{
  name: 'FindSameRegionIn'
}
];
prompt.start();
prompt.get(prompt_attributes, function showCapital(err, result) {
  if (err) {
    console.log(err);
    return -1;
  } else {
    let data = result.country;
    let region = result.region;
    let language = result.spokenlanguage;
    let officialLanguage = result.officialLanguage;
    let sameRegion = result.FindSameRegionIn;
    //4.List all the continents with the number of languages spoken in each continent
    connection.execute(
      "SELECT c.continent, COUNT(DISTINCT co.language) AS N FROM Country c JOIN countrylanguage co ON c.code = co.countrycode GROUP BY continent ORDER BY N",
      function showCapital(err, results) {
        if (err) {
          console.log(err);
          return -1;
        } else {
          console.log(`the number of languages spoken in each continent`, results);
        }
      }
    )
    //1. What is the capital of country X ? (Accept X from user)
    if (data != null) {
      connection.execute(
        'SELECT ci.name FROM country c join city ci On c.capital = ci.id where c.name = ? ', [data],
        function showCapital(err, results) {
          if (err) {
            console.log(err);
            return -1;
          } else {
            console.log(`the capital is`, results);
          }
        }
      )
    };
    //2.list all the languages spoken in the region Y (Accept Y from user)
    if (region != null) {
      connection.execute(
        'SELECT DISTINCT co.language  FROM countrylanguage co    INNER JOIN    country c  ON co.countrycode = c.code where c.region = ?', [region],
        function showCapital(err, results) {
          if (err) {
            console.log(err);
            return -1;
          } else {
            console.log(`the languages spoken in the region are :`, results);
          }

        }
      )
    }
    //3.Find the number of cities in which language Z is spoken (Accept Z from user)
    if (language != null) {
      connection.execute(
        ' SELECT city.name from city inner join countrylanguage on countrylanguage.countrycode = city.countrycode where countrylanguage.language = ?', [language],
        function showCapital(err, results) {
          if (err) {
            console.log(err);
            return -1;
          } else {
            console.log(`cities speak the language are`, results);
          }
        }
      )
    }
    //5.Are there any countries that have Same official language and same region
    if (officialLanguage != null && sameRegion != null) {
      connection.execute(
        " SELECT name,region FROM country WHERE region = ? AND code IN  (SELECT countrycode FROM countryLanguage WHERE IsOfficial = 't' AND language = ?)", [sameRegion, officialLanguage],
        function showCapital(err, results) {
          if (err) {
            console.log(err);
            return -1;
          } else if (results.length <= 1) {
            return console.log(`countries have the same official language:${false}`)
          } else {
            console.log(`countries have the same official language`, results);
          }
        }
      )
    } else {
      console.log('please write input');
    }
  }
});
app.listen('3000', () => {
  // console.log('Server started on port 3300');
});