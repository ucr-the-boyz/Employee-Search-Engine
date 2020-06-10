// Dependencies
// =============================================================
var express = require("express");
var exphbs = require('express-handlebars');
var compression = require('compression')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 7070;

app.use(express.static( __dirname + "/public"));
// Sets up the Express app to handle data parsing // middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//compresses all responses
app.use(compression())

// Static directory

// comment

//sets up handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// Routes
// =============================================================
var routes = require('./controllers/ch_controllers');
app.use(routes)

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
