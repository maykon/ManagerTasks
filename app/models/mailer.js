var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function(app) {
  var model = {},
    options = app.config.mailer;

  var mailer = nodemailer.createTransport(sgTransport(options));

  model.sendMail = function(req, res, user, token, done) {
    var sendTo = user.email;
    var mailOptions = {
      to: sendTo,
      from: 'passwordreset@managertasks.com',
      subject: 'ManagerTasks Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      html: '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>' +
        '<p>Please click on the following link, or paste this into your browser to complete the process:<p>' +
        '<bockquote><a href="http://' + req.headers.host + '/reset/' + token + '">http://' + req.headers.host + '/reset/' + token + '</a></bockquote>' +
        '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
    };
    mailer.sendMail(mailOptions, function(err, info) {
      console.error(err);
      console.log(info);
      res.json({
        message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
      });
      done(err, 'done');
    });
  };

  return model;
};
