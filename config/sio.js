var sio = require('socket.io')(80);

exports.attach = (server, app) => {
  sio.attach(server);
  var projectIO = require('./sio/project');
  projectIO.connect(app, sio);
};
