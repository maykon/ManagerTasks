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
      return User.authenticate(req, username, password, done);
    }));

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      var findOrCreateUser = function() {
        User.findOne({
          username: username
        })
          .exec()
          .then((user) => {
            if (user) {
              return done(null, false, req.flash('info', 'Usuário já registrado!'));
            }

            var data = {
              username: username,
              password: password
            };
            var user = User.create(data)
              .then((user) => {
                return done(null, user, req.flash('info', 'Usuário registrado com sucesso!'))
              })
              .onReject((error) => {
                return done(null, false, req.flash('info', error.error))
              });
          }).onReject((error) => {
            return done(null, false)
          });
      };

      process.nextTick(findOrCreateUser);
    }));
};
