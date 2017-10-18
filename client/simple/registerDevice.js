//This file registers with the server
'use strict';

/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: http://rpiovn.org/license 
 */

/*
 * Express Dependencies
 */
var express = require('express');
//var querystring = require("querystring");
//var requestHandlers = require("./requestHandlers.js");
//var gpsd = require('./lib/gpsd');
var fs = require('fs');
var http = require('http'); //Used for GET and POST requests
var request = require('request'); //Used for CURL requests.
var Promise = require('node-promise');
var exec = require('child_process').exec; //Used to execute command line instructions.
//var Gpio = require('onoff').Gpio; //Used to read GPIO pins


//Marketplace server
global.serverIp = "192.241.214.57";
global.serverPort = "3000";

//SSH server used for setting up a reverse SSH connection to the Client.
global.sshServerIp = "174.138.35.118";
global.sshServerPort = "6100";

//Local libraries based on the different featuers of this software
/*
var serverSettings = require('./assets/server_settings.json'); //This should be the first library loaded.
var GPSInterface = require('./lib/gps-interface.js');
var DataLog = require('./lib/data-log.js');
var ServerInterface = require('./lib/server-interface.js');
var WifiInterface = require('./lib/wifi.js');
var AppLogAPI = require('./lib/appLogAPI.js');
var Diagnostics = require('./lib/diagnostics.js');
*/

var writeFiles = require('./writeFiles.js');
global.writeFiles = new writeFiles.Constructor();

try {
  var deviceGUID = require('./deviceGUID.json'); 
  console.log('Registering device ID '+deviceGUID.deviceId);
} catch(err) {
  console.error('Could not open the deviceGUID.json file!', err);
  process.exit(1);
}


var app = express();
var port = 4000;

/*
 * Global Variables
 */
//app.locals.isTracking = false;

//Dev Note: I should make debugState a local varible in each library, so that I can turn debugging on
//for specific featuers like WiFi, GPS, data logging, server interface, etc.
global.debugState = true; //Used to turn verbose debugging off or on.


/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
//app.use(express.compress());

/*
 * Config for Production and Development
 */
app.engine('handlebars', exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views');

// Locate the assets
app.use(express.static(__dirname + '/assets'));


// Set Handlebars
app.set('view engine', 'handlebars');



// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

/* Start up the Express web server */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);


//Simulate benchmark tests with dummy data.
var obj = {};
obj.memory = "Fake Test Data";
obj.diskSpace = "Fake Test Data";
obj.processor = "Fake Test Data";
obj.internetSpeed = "Fake Test Data";
var now = new Date();
obj.checkinTimeStamp = now.toISOString();


//Register with the server by sending the benchmark data.
request.post(
  {
    url: 'http://'+global.serverIp+':'+global.serverPort+'/api/devicePublicData/'+deviceGUID.deviceId+'/register', 
    form: obj
  },
	function (error, response, body) {

	try {
	
    //If the request was successfull, the server will respond with username, password, and port to be
    //used to build the Docker file.
    if (!error && response.statusCode == 200) {
      debugger;

      //Convert the data from a string into a JSON object.
      var data = JSON.parse(body); //Convert the returned JSON to a JSON string.

      console.log('Username: '+data.clientData.username);
      console.log('Password: '+data.clientData.password);
      console.log('Port: '+data.clientData.port);
      
      //var promiseRT = global.writeFiles.writeReverseTunnel(data.clientData.port, data.clientData.username, data.clientData.password);
      var promiseClientConfig = global.writeFiles.writeClientConfig(data.clientData.port);
      
      promiseClientConfig.then( function(results) {
        //debugger;
        
        var promiseDockerfile = global.writeFiles.writeDockerfile(data.clientData.port, data.clientData.username, data.clientData.password);
        
        promiseDockerfile.then( function(results) {
          //debugger;

          console.log('Dockerfile and reverse-tunnel-generated.js successfully written.')

        }, function(error) {
          debugger;
          console.error('Error resolving promise. Error: ', error);
        });
        
      }, function(error) {
        debugger;
        console.error('Error resolving promise. Error: ', error);
      });
      
    } else {
      debugger;

      console.error('Server responded with error when trying to register the device: ',error);
      console.error('Ensure the ID in your deviceGUID.json file matches the ID in the Owned Devices section of the marketplace.');
    }
	} catch(err) {
		console.log('rpiBroker.js exiting with error:'+err);
	}

});

/*
function launchDocker() {
  debugger;
  console.log('Launching Docker container...');
  
  exec('./buildImage', function(err, stdout, stderr) {
    //debugger;

    if (err) {
        console.log('child process for buildImage exited with error code ' + err.code);
        return false;
    } else {
      console.log('Docker image built.');
      
      exec('./runImage', function(err, stdout, stderr) {
        //debugger;

        if (err) {
            console.log('child process for buildImage exited with error code ' + err.code);
            return false;
        } else {
          console.log('Docker image is running.');
        }
      });
    }
  });
}
*/