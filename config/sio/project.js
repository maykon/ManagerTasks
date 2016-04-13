var bluebird = require('bluebird');

var Connection = function(app) {
  var Project = app.models.project;
  var ProjectHelper = {};
  ProjectHelper.getProjectCount = () => {
    return Project.count({});
  };

  var Events = (function(socket){
    var evt = {};
    evt.handlerDisconnected = () => {
      console.log("Disconnected");
    };

    evt.handlerNewProject = () => {
      bluebird.coroutine(function*(){
        var count = yield ProjectHelper.getProjectCount();
        socket.emit('message', 'hello ' + count);
      })();
    };

    return evt;
  });

  var handler = {};
  handler.handlerConnection = function(socket){
    var events = Events(socket);
    socket.on("disconnect", events.handlerDisconnected);
    socket.on('newProject', events.handlerNewProject);

    console.log("Connected");
  };

  return handler;
};

exports.connect = (app, sio) => {
  var conn = Connection(app);
  var projectIO = sio.of('/project');
  projectIO.on('connection', conn.handlerConnection);
};
