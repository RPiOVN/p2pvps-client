/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: MIT License
 *
 * This library file handle communication with the P2P VPS server.
 */

"use strict";

// Libraries
const fs = require("fs");
const request = require("request"); //Used for CURL requests.

// Globals
let globalThis; //Used in functions below when 'this' loses context.

function Constructor() {
  globalThis = this;

  // Register with the server.
  this.register = function(config) {
    return new Promise(function(resolve, reject) {
      debugger;

      //Register with the server by sending the benchmark data.
      request.post(
        {
          url: `http://${global.serverIp}:${global.serverPort}/api/devicePublicData/${
            config.deviceId
          }/register`,
          form: obj,
        },
        function(error, response, body) {
          try {
            //If the request was successfull, the server will respond with username, password, and port to be
            //used to build the Docker file.
            if (!error && response.statusCode === 200) {
              //Convert the data from a string into a JSON object.
              const data = JSON.parse(body); //Convert the returned JSON to a JSON string.

              console.log(`Username: ${data.clientData.username}`);
              console.log(`Password: ${data.clientData.password}`);
              console.log(`Port: ${data.clientData.port}`);

              //var promiseRT = global.writeFiles.writeReverseTunnel(data.clientData.port, data.clientData.username, data.clientData.password);
              const promiseClientConfig = global.writeFiles.writeClientConfig(
                data.clientData.port,
                deviceGUID.deviceId
              );

              promiseClientConfig
                .then(results => {
                  //debugger;

                  const promiseDockerfile = global.writeFiles.writeDockerfile(
                    data.clientData.port,
                    data.clientData.username,
                    data.clientData.password
                  );

                  promiseDockerfile
                    .then(results => {
                      //debugger;

                      console.log("All files written out successfully.");
                      process.exit(1);
                    })
                    .catch(error => {
                      console.error("Error resolving promise. Error: ", error);
                    });
                })
                .catch(error => {
                  console.error("Error resolving promise. Error: ", error);
                })
                .catch(err => {
                  throw err;
                });
            } else {
              console.error(
                "Server responded with error when trying to register the device: ",
                error
              );
              console.error(
                "Ensure the ID in your deviceGUID.json file matches the ID in the Owned Devices section of the marketplace."
              );
            }
          } catch (err) {
            console.log(`rpiBroker.js exiting with error:${err}`);
          }
        }
      );
    });
  };

  // Register with the server.
  this.register2 = function(config) {
    return new Promise(function(resolve, reject) {
      debugger;

      //Register with the server by sending the benchmark data.
      request.post(
        {
          url: `http://${global.serverIp}:${global.serverPort}/api/devicePublicData/${
            config.deviceId
          }/register`,
          form: config.deviceSpecs,
        },
        function(error, response, body) {
          try {
            //If the request was successfull, the server will respond with username, password, and port to be
            //used to build the Docker file.
            if (!error && response.statusCode === 200) {
              //Convert the data from a string into a JSON object.
              const data = JSON.parse(body); //Convert the returned JSON to a JSON string.

              console.log(`Username: ${data.clientData.username}`);
              console.log(`Password: ${data.clientData.password}`);
              console.log(`Port: ${data.clientData.port}`);

              return resolve(data.clientData);
            }
            console.error(
              "Server responded with error when trying to register the device: ",
              error
            );
            console.error(
              "Ensure the ID in your deviceGUID.json file matches the ID in the Owned Devices section of the marketplace."
            );
          } catch (err) {
            console.log(`p2p-vps-server.js/register() exiting with error: ${err}`);
          }
        }
      );
    });
  };

  return this;
}

exports.Constructor = Constructor;
