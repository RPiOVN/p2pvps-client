var express = require('express');

var app = express();
var port = 3125;

/*
 * Config for Production and Development
 */
/*
app.engine('handlebars', exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
}));
*/

// Locate the views
//app.set('views', __dirname + '/views');

// Locate the assets
//app.use(express.static(__dirname + '/assets'));


// Set Handlebars
app.set('view engine', 'handlebars');


/* Start up the Express web server */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);

