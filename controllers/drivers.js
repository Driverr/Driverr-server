//Drivers controller

//Load required packages

var Driver = require('../models/drivers');


/***********************************************
GET Driver 
***********************************************/
//Create endpoint /api/users for GET


// exports.getUsers = function(req, res) {
// 	User.find(function(err, users) {
// 		if (err) 
// 			res.send(err);
// 		res.json(users);
// 	});
// };


/***********************************************
POST login 
***********************************************/
//Create endpoint /api/driver-login for POST



exports.postDrivers = function(req, res) {
	if( !req.body.email ) {
		res.json({ res: false,
			response: 'Missing email. Please provide your email id' });
		return;

	}

	if( !req.body.password ) {
		res.json({ res: false,
			response: 'Missing password. Please provide your password' });
		return;
	}

	var date = new Date().getTime();

	var padded = date.toString(16);
	padded = "dr_" + padded + "_15";

	var driver = new Driver ({
		driver_id: padded,
		//driver_name: req.body.name,
		//driver_number: req.body.number
		password: req.body.password,
		email: req.body.email
	});

	driver.save(function(err) {
		if (err){
			console.log("The error is:" + err);
			res.json({ res: false,
				response: 'Driver details already exists'});
			return;
		}
		
		else {
		console.log("Driver successfuly added with the following details: ");
		//console.log(driver.driver_id + ", " + driver.driver_name + ", " + driver.email + ", " + driver.number  );
		console.log(driver.driver_id + ", " +  driver.email   );
		res.json({ res: true,
			response: padded });	
		}
		
	});

};


/***********************************************
AUTHENTICATE Drivers 
***********************************************/
//Create endpoint /api/authenticate-driver for POST

exports.authenticateDriver = function(req, res) {
	if( !req.body.email ) {
		res.json({ res: false,
			response: 'Missing email. Please provide your email id' });
		return;

	}

	if( !req.body.password ) {
		res.json({ res: false,
			response: 'Missing password. Please provide your password' });
		return;
	}


	Driver.findOne({driver_name: req.body.driver_name}, function(err, driver){
		if(!driver){
			res.json({ res: false,
				response: 'Driver does not exist'});
			return;
		}

		driver.verifyPassword(req.body.password, function(err, isMatch){
			if(err) {
				res.json({ res: false,
					response: err});
				return;
			} else if(!isMatch) {
				res.json({ res: false,
					response: 'Wrong password'});
			} else {
				res.json({ res: true,
					response: 'authenticated'});
			}
		});
	});
};

