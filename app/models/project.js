var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

var model = (function() {
  var types = "Nova funcionalidade,Bug,Serviço".split(',');
  var status = "Aberto Fechado Cancelado".split(' ');

  var osSchema = new Schema({
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: types
    },
    status: {
      type: String,
      enum: status
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

  var projectSchema = new Schema({
    code: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    name: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    orders: [osSchema]
  });

  return mongoose.model('project', projectSchema);
})();

module.exports = function(app) {
  return model;
};
