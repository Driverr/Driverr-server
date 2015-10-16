//Loading required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var http = require('http');

var app = express();
var port = process.env.PORT || 4048 ;

//we import the controllers
var locationController = require('./controllers/location');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var bookController = require('./controllers/booking');
var driverController = require('./controllers/drivers');


//connecting to the driver location database
//replace with mongolab connection URI 
var db = mongoose.connect('mongodb://localhost:27017/dr_loc');


app.use( 
	bodyParser.urlencoded({ 
	extended:true
	 })
);

app.use(bodyParser.json({}));

//Use the passport package in our application
app.use(passport.initialize());

//creating Router
var router = express.Router();


//Create endpoint handlers for /locations
/*router.route('/locations')
	.post(authController.isAuthenticated, locationController.postLocations)
	.get(locationController.getLocations);*/


//Create endpoint handlers for /locations/:location_id
/*router.route('/locations/:location_id')
	.get(authController.isAuthenticated, locationController.getLocation)
	.put(authController.isAuthenticated, locationController.putLocation)
	.delete(authController.isAuthenticated, locationController.deleteLocation);*/


//Create endpoint handlers for registering Users 
router.route('/login')
	.post(userController.postUsers);
	//.get(authController.isAuthenticated, userController.getUsers);

// router.route('/register')
//	.post(userController.regUsers)


//Create endpoint handler for authenticating users
router.route('/authenticate')
	.post(userController.authenticateUser);



//Create endpoint handler for registering drivers
router.route('/driver-register')
	.post(driverController.postDriver);

//Create endpoint handler for authenticating drivers
router.route('/driver-login')
	.post(driverController.authenticateDriver)
	//.get(authController.isAuthenticated, driverController.getDrivers);



router.route('/booking')
	.post(bookController.postBooking)
	.get(authController.isAuthenticated, bookController.getBooking);



//telling app to use router with /api prefix
app.use('/api', router);


//start server by listening to port 4048
//app.listen();

var server = http.createServer(app).listen(port, function() { 
	console.log('Driverr server listening on port ' + port);
});

//console.log("server running at 4048!");







