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

  userSchema.statics.authenticate = function(req, username, password, done) {
    this.findOne({
      username: username
    })
      .exec()
      .then((user) => {
        if (!user) return done(null, false, req.flash('info', 'Usuário não encontrado!'));
        if (!user.isValidPassword(password)) return done(null, false, req.flash('info', 'Senha inválida!'));
        return done(null, user);
      }).onReject((error) => {
        req.flash('info', error.errmsg);
        return done(error);
      });
  };

  return mongoose.model('user', userSchema);
})();

module.exports = function(app) {
  return model;
};
