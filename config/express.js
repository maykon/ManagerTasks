var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var flash = require('connect-flash');

module.exports = function() {
  var app = express();

  app.set('port', process.env.PORT || 8080);
  app.set('secretKey', 'meanManagerTasksSecretKey');
  app.use(logger('dev'));
  app.use(express.static('./public'));
  app.set('view engine', 'hbs');
  app.set('views', './app/views');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(require('method-override')());
  app.use(cookieParser());
  app.use(session({
    secret: app.get('secretKey'),
    resave: true,
    saveUninitialized: true
  }));
  app.use(flash());

  load('models', {
    cwd: 'app'
  })
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);
  require('./passport')(app, passport);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('*', function(req, res) {
    res.status(404).render('404');
  });

  return app;
};
