var http = require('http');
var express = require('express');
var app = require('./config/express')();
require('./config/database')('mongodb://localhost/manager-tasks');

http.createServer(app).listen(app.get('port'), function() {
  console.log('ManagerTasks em execução na porta: ' + app.get('port'));
});
