module.exports = function(app) {
  var controller = {};
  controller.dashboard = function(req, res) {
    res.render('index');
  };

  return controller;
};
