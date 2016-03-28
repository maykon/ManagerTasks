module.exports = function(app) {
  var controller = app.controllers.auth;

  app.post('/login', controller.login);
  app.post('/signup', controller.signup_register);
  app.get('/logout', controller.logout);
  app.post('/forgot_pwd', controller.forgot_pwd);
  app.get('/reset/:token', controller.reset);
  app.post('/reset_token', controller.reset_token);
}
