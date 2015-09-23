//Load required packages

var User = require('../models/user');


/***********************************************
GET Users 
***********************************************/
//Create endpoint /api/users for GET


exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if (err) 
			res.send(err);
		res.json(users);
	});
};


/***********************************************
POST login 
***********************************************/
//Create endpoint /api/login for POST


var count = 0;

exports.postUsers = function(req, res) {
	if(!req.body.cust_name || !req.body.cust_email || !req.body.cust_number) {
		res.json({ message: 'Missing field. Please provide all details.' });
		return;
	}

	var date = new Date().getTime();

	var padded = date.toString(16);

	var user = new User({
		user_id: padded,
		username: req.body.cust_name,
		password: '000xxx',
		email: req.body.cust_email,
		number: req.body.cust_number


	});

	user.save(function(err) {
		if (err){
			console.log("The error is:" + err);
			res.json({message: 'User might already exist'});
			return;
		}
		
		else {
		console.log("user successfuly added with the following details: ");
		console.log(user.user_id + ", " + user.username + ", " + user.email + ", " + user.number  );
		res.json({ success: padded });	
		}
		
	});

};


/***********************************************
AUTHENTICATE Users 
***********************************************/
//Create endpoint /api/authenticate for POST

exports.authenticateUser = function(req, res) {
	if(!req.body.username || !req.body.password){
		res.json({ message: 'Error processing the request' });
		return;
	}

	User.findOne({username: req.body.username}, function(err, user){
		if(!user){
			res.json({message: 'User does not exist'});
			return;
		}

		user.verifyPassword(req.body.password, function(err, isMatch){
			if(err) {
				res.json({message: err});
				return;
			} else if(!isMatch) {
				res.json({message: 'Wrong password.'});
			} else {
				res.json({success: 'authenticated'});
			}
		});
	});
};

