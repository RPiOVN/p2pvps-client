//This is an example router file for a Keystone View '/test'

var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'test';

  // Render the view
  view.render('test');

};