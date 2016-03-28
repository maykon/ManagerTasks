var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function(app) {
  var model = {},
    options = app.config.mailer;

  var mailer = nodemailer.createTransport(sgTransport(options));

  model.sendResetPassword = function(req, res, user, token, done) {
    var sendTo = user.email;
    var mailOptions = {
      to: sendTo,
      from: 'passwordreset@managertasks.com',
      subject: 'ManagerTasks Password Reset',
      text: 'Você está recebendo isto porque você ou outra pessoa solicitou a recuperação da senha da sua conta.\n\n' +
        'Por favor, clique sobre o link a seguir, ou copie este em seu navegador para completar o processo:\n\n' +
        'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
        'Se você não solicitou isso, por favor, ignore este email e sua senha irá permanecer inalterada.\n',
      html: '<p>Você está recebendo isto porque você ou outra pessoa solicitou o reset da senha da sua conta.</p>' +
        '<p>Por favor, clique sobre o link a seguir, ou copie este em seu navegador para completar o processo:<p>' +
        '<bockquote><a href="http://' + req.headers.host + '/#/reset/' + token + '">http://' + req.headers.host + '/reset/' + token + '</a></bockquote>' +
        '<p>Se você não solicitou isso, por favor, ignore este email e sua senha irá permanecer inalterada.</p>'
    };
    mailer.sendMail(mailOptions, function(err, info) {
      console.error(err);
      console.log(info);
      res.json({
        message: 'Um email foi enviado para ' + user.email + ' com as instruções.'
      });
      done(err, 'done');
    });
  };

  model.sendPasswordChanged = function(req, res, user, done) {
    var sendTo = user.email;
    var mailOptions = {
      to: sendTo,
      from: 'passwordreset@managertasks.com',
      subject: 'Sua senha foi alterada',
      text: 'Olá,\n\n' +
        'Esta é uma confirmação que a senha da sua conta ' + user.email + ' foi alterada.\n',
      html: '<p>Olá,</p>' +
        '<p>Esta é uma confirmação que a senha da sua conta ' + user.email + ' foi alterada.<p>'
    };
    mailer.sendMail(mailOptions, function(err, info) {
      console.error(err);
      console.log(info);
      res.json({
        message: 'Sua senha foi alterada com sucesso!'
      });
      done(err, 'done');
    });
  };

  return model;
};
