var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
var config = require('./config')();
var expressLayouts = require('express-ejs-layouts')

module.exports = function() {
  var app = express();
  app.config = config;

  var store = new MongoDBStore({
    uri: config.db,
    collection: 'mySessions'
  });
  store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

  app.set('port', process.env.PORT || 8080);
  app.set('secretKey', 'meanManagerTasksSecretKey');
  app.use(logger('dev'));
  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views', './app/views');
  app.set('layout', 'layout');
  app.use(expressLayouts);
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(require('method-override')('_method'));
  app.use(cookieParser());
  app.use(session({
    secret: app.get('secretKey'),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: store,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  load('models', {
    cwd: 'app'
  })
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);
  require('./passport')(app, passport);

  app.get('*', function(req, res) {
    var username = req.user ? req.user.username : null;
    res.status(404).render('404', {
      username: username
    });
  });

  app.use(function(err, req, res, next) {
    var username = req.user ? req.user.username : null;
    console.error(err.stack);
    var error = err.message ? err.message : err.errmsg;
    res.status(500).render('error', {
      error: error,
      username: username
    });
  });

  return app;
};
