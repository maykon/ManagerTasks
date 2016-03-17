var LocalStrategy = require('passport-local').Strategy;

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
      return User.authenticate(username, password, done);
    }));
};
