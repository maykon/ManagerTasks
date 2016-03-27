var passport = require('passport');

module.exports = function(app) {
  var utils = app.controllers.utils;
  var controller = {};

  controller.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.status(401).json({
      error: 'Usuário não autenticado!'
    });
  };

  controller.login = [passport.authenticate('login', {
    failWithError: true
  }), (req, res) => {
    var username = utils.getUserName(req.user);
    var response = {
      username: username,
      message: 'Login realizado com sucesso!'
    };
    res.status(200).json(response);
  }];

  controller.signup_register = [passport.authenticate('signup', {
    failWithError: true
  }), (req, res) => {
    var username = utils.getUserName(req.user);
    var response = {
      username: username,
      message: 'Usuário cadastrado com sucesso!'
    };
    res.status(200).json(response);
  }];

  controller.logout = function(req, res) {
    req.logout();
    var response = {
      message: 'Realizado logout com sucesso!'
    };
    res.status(200).json(response);
  };

  return controller;
};
