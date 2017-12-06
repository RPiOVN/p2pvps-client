"use strict";

const request = require("request"); //Used for CURL style requests.
const express = require("express");
//const Promise = require("node-promise");

// Global configuration
global.serverIp = "192.241.214.57";
//global.serverIp = "localhost";
global.serverPort = "3000";
global.GUID = "59e58bdee3627a0001a83d9d";

const app = express();
const port = 4010;

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
console.log(`P2P VPS Keep Alive timer started on port ${port}`);

//Simulate benchmark tests with dummy data.
const obj = {};
obj.memory = "Fake Test Data";
obj.diskSpace = "Fake Test Data";
obj.processor = "Fake Test Data";
obj.internetSpeed = "Fake Test Data";
const now = new Date();
obj.checkinTimeStamp = now.toISOString();

const checkInTimer = setInterval(function() {
  //Register with the server by sending the benchmark data.
  request.get(
    {
      url: `http://${global.serverIp}:${global.serverPort}/api/deviceCheckIn/${global.GUID}`,
      // form: obj
    },
    function(error, response, body) {
      try {
        debugger;
        //If the request was successfull, the server will respond with username, password, and port to be
        //used to build the Docker file.
        if (!error && response.statusCode === 200) {
          debugger;

          //Convert the data from a string into a JSON object.
          const data = JSON.parse(body); //Convert the returned JSON to a JSON string.

          if (data.success) {
            // console.log('check-in succeeded.');
          } else {
            console.error(`Check-in failed for ${global.GUID}`);
          }
        } else {
          debugger;

          console.error("Server responded with error when trying to register the device: ", error);
          console.error(
            "Ensure the ID in your deviceGUID.json file matches the ID in the Owned Devices section of the marketplace."
          );
        }
      } catch (err) {
        console.log(`rpiBroker.js exiting with error:${err}`);
      }
    }
  );
}, 120000);
