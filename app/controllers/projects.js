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
    Project.find({}).sort({
      code: 1
    })
      .exec()
      .then((projects) => {
        res.render('projects/projects', {
          username: username,
          messages: req.flash('info'),
          projects: projects
        });
      })
      .onReject((error) => res.status(500).render('error', {
        username: username,
        error: error.errmsg
      }));
  };

  controller.newProject = function(req, res) {
    var username = getUserName(req.user);
    res.render('projects/new', {
      username: username
    });
  };

  controller.saveProject = function(req, res) {
    var data = sanitize(req.body);
    var username = getUserName(req.user);
    Project.create(data)
      .then(() => {
        res.locals.messages = req.flash('info', 'Projeto criado com sucesso!');
        res.redirect(PROJECT_PATH);
      })
      .onReject((error) => res.status(500).render('error', {
        username: username,
        error: error.errmsg
      }));
  };

  controller.showProject = function(req, res) {
    var _id = sanitize(req.params.id);
    var username = getUserName(req.user);
    Project.findById(_id)
      .exec()
      .then((project) => res.render('projects/show', {
        username: username,
        project: project
      }))
      .onReject((error) => {
        var error = error.message ? error.message : error.errmsg;
        console.error(error);
        res.status(500).render('error', {
          username: username,
          error: error
        })
      });
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
        res.locals.messages = req.flash('info', 'Projeto atualizado com sucesso!');
        res.redirect(PROJECT_PATH);
      })
      .onReject((error) => res.status(500).render('error', {
        username: username,
        error: error.errmsg
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
        res.locals.messages = req.flash('info', 'Projeto removido com sucesso!');
        res.redirect(PROJECT_PATH)
      })
      .onReject((error) => res.status(500).render('error', {
        username: username,
        error: error.errmsg
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
