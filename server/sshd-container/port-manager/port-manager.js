/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: http://rpiovn.org/license 
 */
var express = require('express');
var requestHandlers = require("./requestHandlers.js");
//var http = require('http'); //Used for GET and POST requests

var app = express();
var port = 6001;

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

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

//Request Handler/Webserver functions
app.use('/rentPort', requestHandlers.rentPort);
app.use('/returnPort', requestHandlers.returnPort);

/* Start up the Express web server */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);

