module.exports = function(app) {
  var controller = app.controllers.dashboard;
  var auth_controller = app.controllers.auth;

  app.get('/', controller.home);
  app.get('/dashboard', auth_controller.isAuthenticated, controller.dashboard);
}
