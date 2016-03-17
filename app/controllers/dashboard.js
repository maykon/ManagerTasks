module.exports = function(app) {
  var controller = {};

  controller.home = function(req, res) {
    var username = req.user ? req.user.username : null;
    res.render('index', {
      username: username
    });
  };

  controller.dashboard = function(req, res) {
    var username = req.user ? req.user.username : null;
    res.render('dashboard/dashboard', {
      username: username
    });
  };

  return controller;
};
