//Auth for users

var passport = require('passport');

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
	function(username, password, next) {
		//checking if supplied user exists
		User.findOne({ username: username }, function(err, user) {
			if (err)
				return next(err);
			
			//no user found 
			if(!user)
				return next(null, false);
			
			//making sure password is correct
			user.verifyPassword(password, function(err, isMatch) {
				
				//error
				if (err)
					return next(err);

				//password didnt match
				if(!isMatch)
					return next(null, user);

				//success, passing user to next middleware
				return next(null, user);

			});
		});
	}
	));


//create and export a function named isAuthenticated, tell passport to user our basic strategy and 
//we set session to false to not store any session variables


exports.isAuthenticated = passport.authenticate('basic', { session: false });