/*
 *  The primary functions of this program are to:
 *  -Establish a reverse SSH tunnel with the SSH server
 *  -Run a heartbeat API that updates a timestamp on the P2P VPS server every 2 minutes.
 */

var tunnel = require('reverse-tunnel-ssh'); //tunnel is a ssh2 clientConnection object
var request = require('request');           //Used for CURL style requests.
var express = require('express');
var Promise = require('node-promise');

// Global configuration
//global.serverIp = "192.241.214.57";
global.serverIp = "p2pvps.net";
global.serverPort = "3000";
global.GUID = "59e58bdee3627a0001a83d9d";
global.sshServer = '45.55.12.52';
global.sshServerPort = 6100;
global.sshTunnelPort = 6101;


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

// Check in with the P2P VPS server every 2 minutes with this API.
// This lets the server know the Client is still connected.
var checkInTimer = setInterval(function() {

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

        if(data.success) {
          // console.log('check-in succeeded.');
        } else {
          console.error('Check-in failed for '+global.GUID);
        }

      } else {
        debugger;

        console.error('Server responded with error when trying to register the device: ',error);
        console.error('Ensure the ID in your deviceGUID.json file matches the ID in the Owned Devices section of the marketplace.');
      }
    } catch(err) {
      console.log('rpiBroker.js exiting with error:'+err);
    }

  });

}, 120000);



// Establish a reverse SSH connection.
tunnel({
  host: global.sshServer,
  port: global.sshServerPort, //The SSH port on the server.
  username: 'sshuser',
  password: 'sshuserpassword',
  dstHost: '0.0.0.0', // bind to all IPv4 interfaces
  dstPort: global.sshTunnelPort, //The new port that will be opened
  //srcHost: '127.0.0.1', // default
  srcPort: 3100 // The port on the Pi to tunnel to.
}, function(error, clientConnection) {
  if(error)
    console.error('Error! ', error);

});
