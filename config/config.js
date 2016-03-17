module.exports = function() {
  var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  return require('./env/' + env + '.js');
}
