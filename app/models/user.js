var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

var model = (function() {
  var userSchema = new Schema({
    username: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

  userSchema.pre('save', function(next) {
    this.password = bCrypt.hashSync(this.password, bCrypt.genSaltSync(8), null, next);
    next();
  });

  userSchema.methods.isValidPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
  };

  userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
      username: username
    })
      .exec()
      .then((user) => {
        if (!user) {
          var unauthorized = new Error('Usuário não encontrado!');
          return done(unauthorized);
        }
        if (!user.isValidPassword(password)) {
          var pwdInvalid = new Error('Senha inválida!');
          return done(pwdInvalid);
        }
        return done(null, user);
      }).onReject((error) => {
        return done(error);
      });
  };

  userSchema.statics.signup = function(username, password, done) {
    this.findOne({
      username: username
    })
      .exec()
      .then((user) => {
        if (user) {
          var userFounded = new Error('Usuário já registrado!');
          return done(userFounded);
        }

        var data = {
          username: username,
          password: password
        };
        var user = User.create(data)
          .then((user) => {
            return done(null, user);
          })
          .onReject((error) => {
            return done(error);
          });
      }).onReject((error) => {
        return done(error)
      });
  };

  return mongoose.model('user', userSchema);
})();

module.exports = function(app) {
  return model;
};
