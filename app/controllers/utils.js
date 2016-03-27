module.exports = function(app) {
  var controller = {};

  app.use((req, res, next) => {
    res.locals.username = null;
    res.locals.message = null;
    next();
  });

  controller.getUserName = function(user) {
    return user ? user.username : null;
  };

  controller.getMessageError = function(error) {
    return error.message ? error.message : error.errmsg;
  };

  return controller;
};
