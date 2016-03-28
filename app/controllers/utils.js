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
    var message = error.message ? error.message : error.errmsg;
    if (error.name == "ValidationError") {
      if (error.errors) {
        message = '';
        for (var prop in error.errors) {
          if (error.errors.hasOwnProperty(prop)) {
            message += error.errors[prop].message + "\n";
          }
        }
      }
    }
    return message;
  };

  return controller;
};
