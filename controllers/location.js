//load the location model
var Location = require('../models/location');
var User = require('../models/user');
var mongoose = require('../node_modules/mongoose');

/***********************************************
POST LOCATIONS
***********************************************/
//Create endpoint /api/locations for POST

exports.postLocations = function(req, res) {

	//create a new instance of the location model
	var location = new Location();

	//Set the location properties that came from the POST data
	console.log(req.body.driver_id);
	console.log(req.body.latitude);
	console.log(req.body.longitude);

	location.latitude = req.body.latitude;
	location.longitude = req.body.longitude;
	location.driver_id = req.body.driver_id;

	//passport automatically sets the user in req.user
	location.userId = req.user._id;

	//save the location and check for errors

	location.save(function(err) {
		if(err) {
			res.send(err);
			return;
		}

		res.json({
			success: 'Location added successfully',
			data: location
		});
	});

};

/***********************************************
GET LOCATIONS
***********************************************/
//Create endpoint /api/locations for GET

