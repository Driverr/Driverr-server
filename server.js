var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('bodyParser');
var passport = require('passport');

var app = express();

//connecting to the driver location database
mongoose.connect('mongodb://localhost:27017/dr_loc');


app.use( 
	bodyParser.urlencoded({ 
	extended:true
	 })
);



//creating Router
var router = express.Router();


//telling app to use router with /api prefix
app.use('/api', router);


//start server by listening to port 4048
app.listen(process.env.PORT || 4048);

console.log("server running at 4048!");

