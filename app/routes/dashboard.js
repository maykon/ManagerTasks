module.exports = function(app) {
  var controller = app.controllers.dashboard;
  var auth_controller = app.controllers.auth;

  app.get('/', controller.home);
}
