var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(app) {
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

  userSchema.statics.authenticate = function(username, password, done) {
    console.log(username, ' ', password);
    return this.findOne({
        username: username,
        password: password
      })
      .exec()
      .then((user) => {
        if (!user) return done(null, false);
        console.log(user);
        return done(null, user);
      }, (error) => {
        done(error)
      });
  };

  return mongoose.model('user', userSchema);
};
