module.exports = function(app) {
  var controller = app.controllers.projects;
  var auth_controller = app.controllers.auth;

  app.route('/projects')
    .get(auth_controller.isAuthenticated, controller.listProjects)
    .post(auth_controller.isAuthenticated, controller.saveProject);

  app.get('/projects/new', auth_controller.isAuthenticated, controller.newProject);

  app.route('/projects/:id')
    .get(auth_controller.isAuthenticated, controller.showProject)
    .put(auth_controller.isAuthenticated, controller.updateProject)
    .delete(auth_controller.isAuthenticated, controller.deleteProject);

  app.get('/projects/:id/edit', auth_controller.isAuthenticated, controller.editProject);
};
