var passport = require('passport');
var sanitize = require('mongo-sanitize');
var async = require('async');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

module.exports = function(app) {
  var utils = app.controllers.utils;
  var User = app.models.user;
  var Mailer = app.models.mailer;
  var controller = {};

  controller.responseNotAuthenticated = function(res) {
    return res.status(401).json({
      error: 'Usuário não autenticado!'
    });
  };

  controller.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    return controller.responseNotAuthenticated(res);
  };

  controller.isAdmin = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return controller.responseNotAuthenticated(res);
    };
    var _id = req.session.passport.user;
    User.findOne({
        _id: _id,
        is_admin: true
      }).exec()
      .then((user) => {
        if (!user) return next(new Error('Usuário não é Administrador'));
        next();
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

  controller.forgot_pwd = function(req, res, next) {
    var email = sanitize(req.body.email);
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({
            email: email
          })
          .then((user) => {
            if (!user) return done(new Error('E-mail não encontrado!'));

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
      },
      function(token, user, done) {
        Mailer.sendMail(req, res, user, token, done);
      }
    ]);
  };

  return controller;
};
