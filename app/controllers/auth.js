var passport = require('passport');

module.exports = function(app) {
  var controller = {};

  controller.getUserName = function(user) {
    return user ? user.username : null;
  };

  controller.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  };

  controller.login = passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  });

  controller.signup = function(req, res) {
    res.render('signup');
  };

  controller.signup_register = passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  });

  controller.logout = function(req, res) {
    req.logout();
    res.redirect('/');
  };

  return controller;
};
