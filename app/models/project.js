var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bCrypt = require('bcrypt-nodejs'),
  autoIncrement = require('mongoose-auto-increment');

module.exports = function(app) {
  var connection = mongoose.createConnection(app.config.db);
  autoIncrement.initialize(connection);

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
  projectSchema.plugin(autoIncrement.plugin, {
    model: 'project',
    field: 'code'
  });

  return connection.model('project', projectSchema);
};
