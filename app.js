const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const homeSearch = require('./routes/homeSearch');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Bringing in routes
app.use('/', homeSearch);
app.use('/homeSearch', homeSearch);

// Handling 404 page not found
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(error);
});

// TODO: Set up dev enviornment
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render server-side error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
