/*
  This is the primary 'governor' application that drives a Client devices and allows it to communicate
  with a P2P VPS Server. The scope of this application is to:

  * It reads the deviceGUID.json file and registers the Client device with the P2P VPS server.

  * It builds the Docker container with information returned by the server after registration.

  * It launches the Docker container after being built.

  * It sends a heartbeat signal to the P2P VPS server every 10 minutes. The server responds with an
  expiration date.
    * (Maybe I can also send benchmark data to the server?)

  * When the expiration date is reached, or the Server can not be reached after 30 minutes, the governor
  software stops the Docker container and wipes the flash drive. It then reregisters itself with the
  P2P VPS marketplace.

  Specifications for this program can be found here:
  https://github.com/RPiOVN/p2pvps-server/blob/b1fd8e709f264db4a1d869e8939033ca39a895da/specifications/client-specification.md
*/

/*
 * Copyright 2017 Chris Troutner & RPiOVN.org
 * MIT License. See LICENSE.md for details.
 */

//This file registers with the server
"use strict";

/*
 * Express Dependencies
 */
const express = require("express");
const fs = require("fs");
const http = require("http"); //Used for GET and POST requests
const request = require("request"); //Used for CURL requests.
//var Promise = require('node-promise');
const exec = require("child_process").exec; //Used to execute command line instructions.
const execa = require("execa");
const getStream = require("get-stream");

//Marketplace server
//global.serverIp = "192.241.214.57";
global.serverIp = "p2pvps.net";
global.serverPort = "3001";

//SSH server used for setting up a reverse SSH connection to the Client.
//global.sshServerIp = "174.138.35.118";
global.sshServerIp = "p2pvps.net";
global.sshServerPort = "6100";

//Local libraries based on the different featuers of this software
const writeFiles = require("./lib/write-files.js");
global.writeFiles = new writeFiles.Constructor();
const p2pVpsServer = require("./lib/p2p-vps-server.js");
global.p2pVpsServer = new p2pVpsServer.Constructor();

const app = express();
const port = 4000;
let heartBeatTimer;

/*
 * Global Variables
 */

//Dev Note: I should make debugState a local varible in each library, so that I can turn debugging on
//for specific features like WiFi, GPS, data logging, server interface, etc.
global.debugState = true; //Used to turn verbose debugging off or on.

/*
 * Use Handlebars for templating
 */
const exphbs = require("express3-handlebars");
let hbs;

// For gzip compression
//app.use(express.compress());

/*
 * Config for Production and Development
 */
app.engine(
  "handlebars",
  exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
    partialsDir: "views/partials/",
  })
);

// Locate the views
app.set("views", `${__dirname}/views`);

// Locate the assets
app.use(express.static(`${__dirname}/assets`));

// Set Handlebars
app.set("view engine", "handlebars");

// Index Page
app.get("/", function(request, response, next) {
  response.render("index");
});

/* Start up the Express web server */
app.listen(process.env.PORT || port);
//console.log('Express started on port ' + port);

//Simulate benchmark tests with dummy data.
const obj = {};
obj.memory = "Fake Test Data";
obj.diskSpace = "Fake Test Data";
obj.processor = "Fake Test Data";
obj.internetSpeed = "Fake Test Data";
const now = new Date();
obj.checkinTimeStamp = now.toISOString();

// Read in deviceGUID.json file
let deviceGUID;
try {
  deviceGUID = require("./deviceGUID.json");
  console.log(`Registering device ID ${deviceGUID.deviceId}`);
} catch (err) {
  console.error("Could not open the deviceGUID.json file!", err);
  process.exit(1);
}

const config = {
  deviceId: deviceGUID.deviceId,
  deviceSpecs: obj,
};

// Register with the server.
global.p2pVpsServer
  .register(config)
  /*
  // Write out support files (Dockerfile, reverse-tunnel.js)
  .then(clientData => {
    debugger;

    return (
      global.writeFiles
        // Write out config.json file.
        .writeClientConfig(clientData.port, deviceGUID.deviceId)

        // Write out the Dockerfile.
        .then(() =>
          global.writeFiles.writeDockerfile(
            clientData.port,
            clientData.username,
            clientData.password
          )
        )

        .catch(err => {
          console.error("Problem writing out support files: ", err);
        })
    );
  })

  // Build the Docker container.
  .then(() => {
    const stream = execa("./buildImage").stdout;

    stream.pipe(process.stdout);

    return getStream(stream);
  })

  // Run the Docker container
  .then(() => {
    const stream = execa("./runImage").stdout;

    stream.pipe(process.stdout);

    return getStream(stream);
  })
*/
  .then(() => {
    console.log("Docker image has been build and is running.");

    // Begin 10 minutes loop
    checkExpirationTimer = setInterval(function() {
      checkExpiration();
    }, 1 * 60000);
  })

  .catch(err => {
    console.error("Error in main program: ", err);
  });

// This function is called by a timer after the Docker contain has been successfully
// launched.
function checkExpiration() {
  debugger;

  // Get the devicePublicModel from the server.
  global.p2pVpsServer
    //.sendHeartBeat(deviceGUID.deviceId)
    .getDevicePublicModel(deviceGUID.deviceId)

    // Check expiration date
    .then(serverResponse => {
      debugger;
    })

    .catch(err => {
      debugger;
      console.error("Error in sendHeartBeat: ", err);
    });
}
