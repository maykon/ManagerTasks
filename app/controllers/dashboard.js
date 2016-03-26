module.exports = function(app) {
  var controller = {};

  controller.home = function(req, res) {
    var username = req.user ? req.user.username : null;
    res.render('index', {
      username: username,
      message: req.flash('info')
    });
  };

  controller.dashboard = function(req, res) {
    var username = req.user ? req.user.username : null;
    var response = {
      message: req.flash('info'),
      dashboard: []
    };
    res.status(200).json(response).end();
  };

  return controller;
};
