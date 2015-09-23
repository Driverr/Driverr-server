//Location controller for drivers?

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
	location.active = true;

	//passport automatically sets the user in req.user
	//location.userId = req.user._id;

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
GET LOCATIONS - 
***********************************************/
//Create endpoint /api/locations for GET


exports.getLocations = function(req,res) {
	//Use the Location model to find all driver locations ?

	//Use the Location model to find all locations from particular user with their username

	Location.find({}).lean().exec(function  (err, locations) {
		if(err){
			res.send(err);
			return;
		}


	//We want to set the username on each location by looking up the userId in the user documents

	//Because of Mongoose asynchronism we'll have to wait till to get all the results from the queries on the User model
	//We can send them when we have iterated through every location (counter==l)

	var counter=0;
	var l = locations.length;

	//create a closure to havee access to the location

	var closure = function(location) {
		return function(err,user){
			counter++;
			if(err)
				res.Send(err);

			location.username = user.username;

			//When all the users have been set

			if(counter==l) {
				//respond
				res.json(locations);
				return;
			}
		};
	};

	//We iterate through all the locations to find their associated username

	for( var i=0; i<l; i++) {
		User.findById(locations[i].userId, closure(locations[i]));
	}


});

};




/***********************************************
GET LOCATIONS - for whom? driver
***********************************************/
//Create endpoint /api/locations/:location_id for GET


exports.getLocation = function(req, res) {
	//Use the Location model to find a specfic location

	console.log(req.user._id);
	Location.find({
		userId: req.user._id,
		_id: req.params.location_id
	}, function(err, location) {
		if (err) 
			res.send(err);

			res.json(location);
	});
};


/***********************************************
UPDATE A LOCATION - for driver
***********************************************/
//Create endpoint /api/locations/:location_id for PUT

exports.putLocation = function(req, res) {
	//Use the Location model to find a specific location

	Location.update({
		userId: req.user._id,
		_id: req.params.location_id
	}, {
		message: req.body.message
	}, function (err, num, raw) {
		if(err)
			res.send(err);

		res.json({
			message: 'message updated'
		});
	});
};



/***********************************************
DELETE A LOCATION - for driver - why do i need this?
***********************************************/
//Create endpoint /api/locations/:location_id for DELETE

exports.deleteLocation = function(req, res) {
	//Use the Location model to find a speific location and remove it

	Location.remove({
		userId: req.user._id,
		_id: req.params.location_id
	
}, function(err) {
	if(err) 
		res.send(err);

	res.json({
		message: 'Location deleted'
		});
	});
};


