var passport = require('passport');

module.exports = function(app) {
  var controller = {};

  controller.getUserName = function(user) {
    return user ? user.username : null;
  };

  controller.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    req.flash('info', 'Usuário não autenticado!');
    res.redirect('/');
  };

  controller.login = passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  });

  controller.signup = function(req, res) {
    res.render('signup/signup', {
      messages: req.flash('info')
    });
  };

  controller.signup_register = passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  });

  controller.logout = function(req, res) {
    req.logout();
    req.flash('info', 'Realizado logout com sucesso!');
    res.redirect('/');
  };

  return controller;
};
