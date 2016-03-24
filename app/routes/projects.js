module.exports = function(app) {
  var controller = app.controllers.projects;
  var auth_controller = app.controllers.auth;

  app.route('/projects')
    .get(auth_controller.isAuthenticated, controller.listProjects)
    .post(auth_controller.isAuthenticated, controller.saveProject);

  app.route('/projects/:id')
    .get(auth_controller.isAuthenticated, controller.showProject)
    .put(auth_controller.isAuthenticated, controller.updateProject)
    .delete(auth_controller.isAuthenticated, controller.deleteProject);
};
