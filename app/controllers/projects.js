var sanitize = require('mongo-sanitize');

module.exports = function(app) {
  const PROJECT_PATH = '/projects';
  var Project = app.models.project;

  var getUserName = function(user) {
    return user ? user.username : null;
  };

  var controller = {};
  controller.listProjects = function(req, res) {
    var username = getUserName(req.user);
    Project.find({})
      .exec()
      .then((projects) => {
        var response = {
          username: username,
          messages: req.flash('info'),
          projects: projects
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        username: username,
        messages: error.errmsg
      }));
  };

  controller.newProject = function(req, res) {
    var username = getUserName(req.user);
    res.render('projects/new', {
      username: username
    });
  };

  controller.saveProject = function(req, res) {
    var data = {
      name: sanitize(req.body.name)
    };
    var username = getUserName(req.user);
    Project.create(data)
      .then(() => {
        var response = {
          username: username,
          messages: 'Projeto criado com sucesso!'
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        username: username,
        messages: error.errmsg
      }));
  };

  controller.showProject = function(req, res) {
    var _id = sanitize(req.params.id);
    var username = getUserName(req.user);
    Project.findById(_id)
      .exec()
      .then((project) => {
        var response = {
          username: username,
          messages: req.flash('info'),
          project: project
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        username: username,
        messages: error.errmsg
      }));
  };

  controller.updateProject = function(req, res) {
    var _id = sanitize(req.params.id);
    var username = getUserName(req.user);
    var data = {
      name: sanitize(req.body.name)
    };
    Project.findByIdAndUpdate({
      _id: _id
    }, data)
      .exec()
      .then(() => {
        var response = {
          username: username,
          messages: 'Projeto atualizado com sucesso!'
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        username: username,
        messages: error.errmsg
      }));
  };

  controller.deleteProject = function(req, res) {
    var _id = sanitize(req.params.id);
    var username = getUserName(req.user);
    Project.findOneAndRemove({
      _id: _id
    })
      .exec()
      .then(() => {
        var response = {
          username: username,
          messages: 'Projeto removido com sucesso!'
        };
        res.status(200).json(response).end();
      })
      .onReject((error) => res.status(500).json({
        username: username,
        messages: error.errmsg
      }));
  };

  controller.editProject = function(req, res) {
    var username = getUserName(req.user);
    var _id = sanitize(req.params.id);
    Project.findById({
      _id: _id
    })
      .exec()
      .then((project) => res.render('projects/edit', {
        username: username,
        project: project
      }))
      .onReject((error) => res.status(500).render('error', {
        username: username,
        error: error.errmsg
      }));
  };

  return controller;
};
