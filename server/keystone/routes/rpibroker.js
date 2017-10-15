var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  // Keystone Views
  //app.get('/test', routes.views.test);
  
  // Plugin API Route
  app.get('/api/portcontrol/list', keystone.middleware.api, routes.api.portcontrol.list);
  app.all('/api/portcontrol/create', keystone.middleware.api, routes.api.portcontrol.create);
  app.all('/api/portcontrol/:id/update', keystone.middleware.api, routes.api.portcontrol.update);
	app.get('/api/portcontrol/:id/remove', keystone.middleware.api, routes.api.portcontrol.remove);
  
  app.get('/api/devicePublicData/list', keystone.middleware.api, routes.api.devicePublicData.list);
  app.all('/api/devicePublicData/create', keystone.middleware.api, routes.api.devicePublicData.create);
  app.all('/api/devicePublicData/:id/update', keystone.middleware.api, routes.api.devicePublicData.update);
	app.get('/api/devicePublicData/:id/remove', keystone.middleware.api, routes.api.devicePublicData.remove);
  app.all('/api/devicePublicData/:id/register', keystone.middleware.api, routes.api.devicePublicData.register);
  
  
  app.get('/api/devicePrivateData/list', keystone.middleware.api, routes.api.devicePrivateData.list);
  app.all('/api/devicePrivateData/create', keystone.middleware.api, routes.api.devicePrivateData.create);
  app.all('/api/devicePrivateData/:id/update', keystone.middleware.api, routes.api.devicePrivateData.update);
	app.get('/api/devicePrivateData/:id/remove', keystone.middleware.api, routes.api.devicePrivateData.remove);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  //app.get('/loggedinuser', middleware.requireUser, routes.views.loggedinuser);
  app.get('/market', middleware.requireUser, routes.views.market);
}

