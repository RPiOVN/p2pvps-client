/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: http://rpiovn.org/license 
 */

//Node.js module used to execute command line programs.
//var exec = require("child_process").exec;

//LIBRARIES
/*
var querystring = require("querystring");
var fs = require('fs'); //file system library
var parse = require('csv-parse'); //CSV parser
//var transform = require('stream-transform'); //data streams transformer
var serverhtml = require('./page_html.js'); //HTML strings for building pages.
var et = require('elementtree'); //Library used for XML parsing.
var events = require('events').EventEmitter; //Event emitter library.
var rander = require('rander'); //Library used to generate UniqueIDs.
var ya_csv = require('ya-csv'); //Ya-csv library used to output csv files.
var exec = require('child_process').exec; //Used to execute command line instructions.
var serverSettings = require('./assets/server_settings.json');
var spawn = require('child_process').spawn; //Used to execut sudo level commands
var sudo = require('sudo'); //Used to execut sudo level commands with spawn
*/

//GLOBAL VARIABLES
var portRangeStart = 6002;
var portRangeEnd = 6200;
var portsAvailable = [];
var portsInUse = [];


// CUSTOMIZATION VARIABLES
//var wwwDir = '/inetpub/wwwroot/'  //Windows 2008 Server
//var wwwDir = '/var/www/'          //Linux
//var wwwDir = './'                   //Node/Express
//var sudoPassword = "raspberry"; //The root password required when running 'sudo' commands.


//Initialize the portsAvailable array
for(var i=portRangeEnd; i > portRangeStart; i--) {
  portsAvailable.push(i);
}

/******************************************************************************
Summary:

******************************************************************************/
function rentPort(request, response, next) {
  debugger;
  
  var nextPort = portsAvailable.pop();
  portsInUse.push(nextPort);
  
  response.send({
    port: nextPort
  });
}

/******************************************************************************
Summary:

******************************************************************************/
function returnPort(request, response, next) {
  debugger;
  
  var port = Number(request.query.port);
  
  var index = portsInUse.indexOf(port);
  
  if(index == -1) {
    response.send(false);
    return;
  }
  
  //Remove the port from the portsInUse array.
  portsInUse.splice(index,1);
  
  //Add it back into the portsAvailable array
  portsAvailable.push(port);
  
  response.send(true);
  
}

exports.rentPort = rentPort;
exports.returnPort = returnPort;

