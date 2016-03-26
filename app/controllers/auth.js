var passport = require('passport');

module.exports = function(app) {
  var controller = {};

  app.use((req, res, next) => {
    res.locals.username = null;
    res.locals.message = null;
    next();
  });

  controller.getUserName = function(user) {
    return user ? user.username : null;
  };

  controller.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.status(401).json({
      error: 'Usuário não autenticado!'
    }).end();
  };

  controller.login = [passport.authenticate('login', {
    failWithError: true
  }), (req, res) => {
    var username = controller.getUserName(req.user);
    var response = {
      username: username,
      message: 'Login realizado com sucesso!'
    };
    res.status(200).json(response).end();
  }];

  controller.signup_register = [passport.authenticate('signup', {
    failWithError: true
  }), (req, res) => {
    var username = controller.getUserName(req.user);
    var response = {
      username: username,
      message: 'Usuário cadastrado com sucesso!'
    };
    res.status(200).json(response).end();
  }];

  controller.logout = function(req, res) {
    req.logout();
    var response = {
      message: 'Realizado logout com sucesso!'
    };
    res.status(200).json(response).end();
  };

  return controller;
};
