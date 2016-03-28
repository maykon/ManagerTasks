var LocalStrategy = require('passport-local').Strategy;
var sanitize = require('mongo-sanitize');

module.exports = function(app, passport) {
  var User = app.models.user;

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).exec()
      .then((user) => done(null, user))
      .onReject((error) => done(error));
  });

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      username = sanitize(username);
      password = sanitize(password);
      return User.authenticate(username, password, done);
    }));

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      console.log(username);
      username = sanitize(username);
      password = sanitize(password);
      var email = sanitize(req.body.email);
      var findOrCreateUser = function() {
        return User.signup(username, password, email, done);
      };

      process.nextTick(findOrCreateUser);
    }));
};
