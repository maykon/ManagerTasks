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
    email: {
      type: String,
      match: [/@/, 'Endereço de e-mail inválido.'],
      index: {
        unique: true
      }
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    is_admin: {
      type: Boolean,
      defautl: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  });

  function hashPwd(password, cb) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null, cb);
  };

  userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    user.password = hashPwd(user.password, next);
    next();
  });

  userSchema.methods.isValidPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
  };

  userSchema.statics.hashPwd = function(password, cb) {
    return hashPwd(password, bCrypt.genSaltSync(8), null, cb);
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

  userSchema.statics.signup = function(username, password, email, done) {
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
          password: password,
          email: email
        };
        var user = new this(data);
        var error = user.validateSync();
        if (error) return done(error);
        user.save((err, user) => {
          if (err) return done(err);
          return done(null, user);
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
