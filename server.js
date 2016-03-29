var http = require('http');
var app = require('./config/express')();
var config = require('./config/config')();
require('./config/database')(config.db, config.db_debug);

http.createServer(app).listen(config.port, config.address, function() {
  console.log('ManagerTasks em execução ', config.address,
    ' (', config.env, ') escutando na porta ', config.port);
});
