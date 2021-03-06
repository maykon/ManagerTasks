var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  var Project = app.models.project;
  var utils = app.controllers.utils;

  var controller = {};

  controller.lastProjects = () => {
    return Project.find({})
      .sort({
        'created_at': -1
      })
      .limit(5);
  };

  controller.listProjects = function(req, res) {
    var query = req.query.last ? controller.lastProjects() : Project.find({});
    query
      .exec()
      .then((projects) => {
        var response = req.query.last ? {
          projects: projects
        } : projects;
        res.status(200).json(response);
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.saveProject = function(req, res) {
    var data = {
      name: sanitize(req.body.name)
    };
    Project.create(data)
      .then(() => {
        var response = {
          message: 'Projeto criado com sucesso!'
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.showProject = function(req, res) {
    var _id = sanitize(req.params.id);
    Project.findById(_id)
      .exec()
      .then((project) => {
        var response = {
          project: project
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.updateProject = function(req, res) {
    var _id = sanitize(req.params.id);
    var data = {
      name: sanitize(req.body.name)
    };
    Project.findByIdAndUpdate({
        _id: _id
      }, data)
      .exec()
      .then(() => {
        var response = {
          message: 'Projeto atualizado com sucesso!'
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  controller.deleteProject = function(req, res) {
    var _id = sanitize(req.params.id);
    Project.findOneAndRemove({
        _id: _id
      })
      .exec()
      .then(() => {
        var response = {
          message: 'Projeto removido com sucesso!'
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        error: utils.getMessageError(error)
      }));
  };

  return controller;
};
