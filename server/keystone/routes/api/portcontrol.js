var async = require('async');
var keystone = require('keystone');
//var sudo = require('sudo'); //Used to execut sudo level commands with spawn


var DevicePrivateModel = keystone.list('DevicePrivateModel');
var DevicePublicModel = keystone.list('DevicePublicModel');
var PortsUsedModel = keystone.list('PortsUsedModel');

/**
 * List ExamplePluginModels
 */
exports.list = function(req, res) {
	DeviceModel.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			collection: items
		});
		
	});
}

/**
 * Create ExamplePluginModel
 */
exports.create = function(req, res) {
	debugger;
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
	//var item = new DeviceModel.model();
  //var data = (req.method == 'POST') ? req.body : req.query;
	
  //Randomly generate username
  var username = randomString(10);
  
  //Randomly generate password
  var password = randomString(10);
  
  var data2 = {};
  data2.username = username;
  data2.password = password;
  
  //Get a port assignment
  //var port = getPort(req, data2);
  
  //Retrieve the list of used ports from the database.
  PortsUsedModel.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
    debugger;
    
    //Handle new database by creating first entry.
    if(items.length == 0) {
      
      var item = new PortsUsedModel.model();
      var data = {};
      
      //item.set('usedPort', ["3000"]);
      data.usedPort = ["6000"];
      item.getUpdateHandler(req).process(data, function(err) {

        if (err) return res.apiError('error', err);

        //return "3001";

      });
      
      var newPort = "6001";
      
    } else {
      var portsModel = items[0];
      var portList = portsModel.get('usedPorts');
      var lastPort = portList[portList.length-1];
      
      //Error Handling
      if(lastPort == undefined)
        lastPort = "6000";
      
      var newPort = Number(lastPort)+1;
      newPort = newPort.toString();
      
      portList.push(newPort);
      portsModel.set('usedPorts', portList);
      portsModel.save();
      
    }

    debugger;
    //item.set('username', username);
    //item.set('password', password);
    //item.set('port', newPort);
    //item.save();
    data2.port = newPort;
    
    //Return all information
    //res.apiResponse( {
    //  device: item
    //});

    /*
    var item2 = new DeviceModel.model();
    item2.getUpdateHandler(req).process(data2, function(err) {

      if (err) return res.apiError('error', err);

      res.apiResponse({
        newDevice: item2
      });
  
    });
    */
    res.apiResponse({
      newDevice: data2
    });
    
		//res.apiResponse({
		//	collection: items
		//});
		
    //return 3001;
    
	});
  
  
}

/**
 * Update ExamplePluginModel by ID
 */
exports.update = function(req, res) {
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  var isAdmin = req.user.get('isAdmin');
  if(!isAdmin) {
    return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  }
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  var admins = keystone.get('admins');
  var userId = req.user.get('id');
  if(admins.indexOf(userId) == -1) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  }
  
	DeviceModel.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				collection: item
			});
			
		});
		
	});
}

/**
 * Delete ExamplePluginModel by ID
 */
exports.remove = function(req, res) {
	
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  var isAdmin = req.user.get('isAdmin');
  if(!isAdmin) {
    return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  }
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  var admins = keystone.get('admins');
  var userId = req.user.get('id');
  if(admins.indexOf(userId) == -1) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  }
  
  DeviceModel.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var getPort = function(req, data2) {
  debugger;
  
  
}