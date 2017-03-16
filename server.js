const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partial');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var logEntry = `${now}: ${req.method} ${req.url}`;
  console.log(logEntry);
  fs.appendFile('server.log', logEntry + '\n');

  next();

});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Site ist Tot'
//   });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Us'
  });
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to the home page of the CSS NodeJS Site!'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
