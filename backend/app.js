var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var app = express();
const fs = require('fs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// log to file
app.use(logger('common', {
  stream: fs.createWriteStream('./logs/error.log', {flags: 'a'})
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

const cors = require('cors');

app.use(cors());
app.options('*', cors());

// routes
require('./routes/index')(app);

// database init config
require('./config/db');

// passportjs
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/', function(req,res){
	res.json({status: 'OK'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
