var keystone = require('keystone');

exports = module.exports = function(req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;

        locals.user = req.user;
        locals.user.password = "";
  
        // Set locals
        locals.section = 'loggedinuser';

        // Render the view
        view.render('loggedinuser');

};