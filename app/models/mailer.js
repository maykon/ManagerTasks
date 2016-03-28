var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require('xoauth2');
var async = require('async');

module.exports = function(app) {
  var mailer = {};

  var generator = require('xoauth2').createXOAuth2Generator({
    user: credentials.gmail.user,
    clientId: credentials.gmail.clientId,
    clientSecret: credentials.gmail.clientSecret,
    refreshToken: credentials.gmail.refreshToken
  });

  generator.on('token', function(token) {
    console.log('New token for %s: %s', token.user, token.accessToken);
  });
  //var mailTransport = nodemailer.createTransport();
  var mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      XOAuth2: generator
    },
    debug: true
  });
  mailTransport.on('log', console.log);


  mailer.sendMail = function(req, res, user, token, done) {
    var sendTo = user.email;
    var mailOptions = {
      to: sendTo,
      from: 'passwordreset@managertasks.com',
      subject: 'ManagerTasks Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    transporter.sendMail(mailOptions, function(err, info) {
      console.error(err);
      console.error(info);
      res.json({
        message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
      });
      done(err, 'done');
    });
  };

  return mailer;
};
