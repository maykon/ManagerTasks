var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var User = app.models.user;
  var utils = app.controllers.utils;

  var controller = {};
  controller.listUsers = function(req, res) {
    User.find({})
      .exec()
      .then((users) => {
        res.status(200).json(users);
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.saveUser = function(req, res) {
    var data = {
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
      email: sanitize(req.body.email),
      is_admin: sanitize(req.body.is_admin)
    };
    User.create(data)
      .then(() => {
        var response = {
          message: 'Usuário criado com sucesso!'
        };
        res.status(200).json(response);
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.showUser = function(req, res) {
    var _id = sanitize(req.params.id);
    User.findById(_id)
      .exec()
      .then((user) => {
        var response = {
          user: user
        };
        res.status(200).json(response);
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.updateUser = function(req, res) {
    var _id = sanitize(req.params.id);
    var data = {
      username: sanitize(req.body.username),
      email: sanitize(req.body.email),
      is_admin: sanitize(req.body.is_admin),
    };
    var password = sanitize(req.body.password);
    if ((password != "") && (password != null)) {
      data.password = User.hashPwd(password);
    }
    User.findByIdAndUpdate({
        _id: _id
      }, data)
      .exec()
      .then(() => {
        var response = {
          message: 'Usuário atualizado com sucesso!'
        };
        res.status(200).json(response);
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.deleteUser = function(req, res) {
    var _id = sanitize(req.params.id);
    User.findOneAndRemove({
        _id: _id
      })
      .exec()
      .then(() => {
        var response = {
          message: 'Usuário removido com sucesso!'
        };
        res.status(200).json(response);
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  return controller;
};
