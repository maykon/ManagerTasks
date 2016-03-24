module.exports = function(app) {
  var controller = app.controllers.auth;

  app.post('/login', controller.login);
  app.post('/signup', controller.signup_register);
  app.get('/logout', controller.logout);
}
