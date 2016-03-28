module.exports = function(app) {
  var controller = app.controllers.users;
  var auth_controller = app.controllers.auth;

  app.route('/users')
    .get(auth_controller.isAdmin, controller.listUsers)
    .post(auth_controller.isAdmin, controller.saveUser);

  app.route('/users/:id')
    .get(auth_controller.isAdmin, controller.showUser)
    .put(auth_controller.isAdmin, controller.updateUser)
    .delete(auth_controller.isAdmin, controller.deleteUser);
};
