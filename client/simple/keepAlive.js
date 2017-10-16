
var request = require('request'); //Used for CURL style requests.
var express = require('express');
var Promise = require('node-promise');

// Global configuration
global.serverIp = "192.168.2.2";
global.serverPort = "3000";
global.GUID = "59e3e8fd9fea3a007ff72af5";


var app = express();
var port = 4010;

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
console.log('P2P VPS Keep Alive timer started on port ' + port);


//Simulate benchmark tests with dummy data.
var obj = {};
obj.memory = "Fake Test Data";
obj.diskSpace = "Fake Test Data";
obj.processor = "Fake Test Data";
obj.internetSpeed = "Fake Test Data";
var now = new Date();
obj.checkinTimeStamp = now.toISOString();


//Register with the server by sending the benchmark data.
request.get(
  {
    url: 'http://'+global.serverIp+':'+global.serverPort+'/api/deviceCheckIn/'+global.GUID, 
    // form: obj
  },
	function (error, response, body) {

	try {
    debugger;
    //If the request was successfull, the server will respond with username, password, and port to be
    //used to build the Docker file.
    if (!error && response.statusCode == 200) {
      debugger;

      //Convert the data from a string into a JSON object.
      var data = JSON.parse(body); //Convert the returned JSON to a JSON string.

      /*
      console.log('Username: '+data.clientData.username);
      console.log('Password: '+data.clientData.password);
      console.log('Port: '+data.clientData.port);
      
      var promiseRT = global.writeFiles.writeReverseTunnel(data.clientData.port, data.clientData.username, data.clientData.password);
      
      promiseRT.then( function(results) {
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
      */
    } else {
      debugger;

      console.error('Server responded with error when trying to register the device: ',error);
      console.error('Ensure the ID in your deviceGUID.json file matches the ID in the Owned Devices section of the marketplace.');
    }
	} catch(err) {
		console.log('rpiBroker.js exiting with error:'+err);
	}

});

