var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');  
const session = require('express-session');
require('./config/passport');
require('dotenv/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
var app = express();

mongoose.connect(process.env.DB_MONGO_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if (err)
  { 
    console.log('Failed connected!!!')
    throw err;
  }
  console.log("connect to db");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(validator());
app.use(session({
  secret:'secured_key',
  resave:false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

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
