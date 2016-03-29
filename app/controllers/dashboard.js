module.exports = function(app) {
  var controller = {};

  controller.home = function(req, res) {
    var username = req.user ? req.user.username : null;
    res.render('index', {
      username: username,
      message: req.flash('info')
    });
  };

  return controller;
};
