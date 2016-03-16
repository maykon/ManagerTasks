module.exports = function(app) {
  var controller = app.controllers.auth;

  app.post('/login', controller.login);

  app.route('/signup')
    .get(controller.signup)
    .post(controller.signup_register);

  app.get('/logout', controller.logout);
}
