//express vars
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var index = require('./routes/index');
var users = require('./routes/users');

//endpoints

var usuarios = require('./routes/usuarios');
var descuentos = require('./routes/descuentos');
var empresas = require('./routes/empresas');

// Login EndPoint - jwt
var login = require('./routes/login');

// compression para rutas
var compression = require('compression');
var helmet = require('helmet');

// express app object
var app = express();

app.use(helmet());



//Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://mproot:newpass1@ds111565.mlab.com:11565/melulpiup' // https://mlab.com
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator() );

app.use(cookieParser());

app.use(compression()); // Compress Routes

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/empresas', empresas); //empreas middleware
app.use('/usuarios', usuarios); //usuarios middleware
app.use('/descuentos', descuentos); // descuentos middleware


// jwt
app.use('/login', login); //LOGIN MIDDLEWARE

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
