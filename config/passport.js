var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(app, passport) {
  var User = app.models.user;

  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing user: ');
    console.log(id);
    User.findById(id).exec()
      .then((user) => done(null, user), (error) => done(error));
  });

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      console.log('teste');
      return User.authenticate(username, password, done);
    }));

};
