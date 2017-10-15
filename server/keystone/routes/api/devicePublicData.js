var keystone = require('keystone');
var request = require('request');


var DevicePublicModel = keystone.list('DevicePublicModel');

/**
 * List Devices
 */
exports.list = function(req, res) {
	DevicePublicModel.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			collection: items
		});
		
	});
}

/**
 * Create DevicePrivateModel
 */
exports.create = function(req, res) {
	//debugger;
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
	var item = new DevicePublicModel.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			collection: item
		});
		
	});
  
}

/**
 * Update DevicePrivateModel by ID
 */
exports.update = function(req, res) {
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  //var isAdmin = req.user.get('isAdmin');
  //if(!isAdmin) {
  //  return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  //}
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  //var admins = keystone.get('admins');
  //var userId = req.user.get('id');
  //if(admins.indexOf(userId) == -1) {
  //  return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  //}
  
	DevicePublicModel.model.findById(req.params.id).exec(function(err, item) {
		
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
 * Delete DevicePrivateModel by ID
 */
exports.remove = function(req, res) {
	
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  //var isAdmin = req.user.get('isAdmin');
  //if(!isAdmin) {
  //  return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  //}
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  /*
  var admins = keystone.get('admins');
  var userId = req.user.get('id');
  if(admins.indexOf(userId) == -1) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  }
  */
  
  DevicePublicModel.model.findById(req.params.id).exec(function (err, item) {
		
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


/**
 * This API is called by the RPi client to register a new device.
 */
exports.register = function(req, res) {
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //Ensure the user making the request is a Keystone Admin
  //var isAdmin = req.user.get('isAdmin');
  //if(!isAdmin) {
  //  return res.apiError(403, 'Not allowed to access this API. Not Keystone Admin.');
  //}
  
  //Since it's possible to spoof the Keystone Admin setting in the current version of the User model,
  //This is a check to make sure the user is a ConnexstCMS Admin
  //var admins = keystone.get('admins');
  //var userId = req.user.get('id');
  //if(admins.indexOf(userId) == -1) {
  //  return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin')
  //}
  
	DevicePublicModel.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
    debugger;
    
    try {
    
      item.set('memory', data.memory);
      item.set('diskSpace', data.diskSpace);
      item.set('processor', data.processor);
      item.set('internetSpeed', data.internetSpeed);
      item.set('checkinTimeStamp', data.checkinTimeStamp);
      item.save();
      
      var deviceData;
      
      request('http://localhost:3000/api/portcontrol/create', 
      function (error, response, body) {

        //If the request was successfull.
        if (!error && response.statusCode == 200) {
          //debugger;

          //Convert the data from a string into a JSON object.
          var data = JSON.parse(body); //Convert the returned JSON to a JSON string.
          deviceData = data.newDevice;

          res.apiResponse({
            clientData: deviceData
          })
          
          console.log('API call to portcontrol succeeded!');
          
        //Server returned an error.
        } else {
          //debugger;

          try {
            
            var msg = '...Error returned from server when requesting log file status. Server returned: '+error.message;
            console.error(msg);

          //Catch unexpected errors.
          } catch(err) {
            var msg = 'Error in devicePublicData.js/register() while trying to call /api/portcontrol/create. Error: '+err.message;
            console.error(msg);
          }
        }
      });
      
      //Save data to the devicePrivateModel
      
      //Return the data to the client.
      //var obj = {};
      //obj.username = 'test123';
      //obj.password = 'password123';
      //obj.port = 'port123';
      //obj.username = data.username;
      //obj.password = data.password;
      //obj.port = data.port;
      
      
      
    } catch(err) {
      debugger;
      
      console.error('Error while trying to process registration data: ', err);
    }
    
    /*
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				collection: item
			});
			
		});
    */
		
	});
}

