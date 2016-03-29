var mongoose = require('mongoose');

module.exports = function(uri, debug) {
  mongoose.connect(uri, {
    server: {
      poolSize: 15
    }
  });
  if (debug) mongoose.set('debug', true);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose! Conectado em: ' + uri);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose! Desconectado de: ' + uri);
  });

  mongoose.connection.on('error', function(erro) {
    console.log('Mongoose! Erro na conexгo: ' + erro);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose! Desconectando pelo término da aplicação');
      process.exit(0);
    });
  });

  return mongoose;
};
