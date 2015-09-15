//User master schema

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

	user_id:{
	type: String,
	require: true,
	unique: true
	},

	username: {
	type: String,
	//unique: true,
	required: true
	},

	password: {
	type: String,
	// unique: true,
	required: true
	},

	email: {
	type: String,
	required: true
	},

	number: {
	type: Number,
	required: true,
	unique: true
	}
});




	// var user2 = this;

	// var timestamp = user2._id.substring(0,8);
	// console.log("the timestamp from object id is: " + timestamp);	

	// user2.user_id = timestamp;
	// console.log("the user id set is: " + user.user_id);	





//execute before each user.save() call
UserSchema.pre('save', function(next){
	var user = this;


/*
    User.findByIdAndUpdate({_id: user._id}, {$inc: { user_id: 1} }, function(err, User)   {
        if(err)
            return next(err);
        //doc.testvalue = User.user_id;
        // next();
    });*/




	if(!user.isModified('password')) 
		return next;

	bcrypt.genSalt(5, function(err,salt) {
		if(err)
			return next(err);

		bcrypt.hash(user.password, salt, null, function(err,hash) {
			if(err)
				return next(err);
			user.password = hash;
			next();
		});

	});

});

//Compare the passwords

UserSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if(err)
			return cb(err);
		cb(null, isMatch);
	});

};


/*

Today - Booking model, booking controller, mongoose UI/vis, email alerts/sms alerts?, deploy to heroku

Long term - Server receives a booking, uses GCM to ping driver and listen to a success request and shows to user

DriverReviewsSchema, DriverDetailsSchema, AllBookingsSchema, 


*/


/*// var counter = mongoose.model('counter', UserSchema);

// var entitySchema = mongoose.Schema({
//     testvalue: {type: String}
// });

UserSchema.pre('save', function(next) {
    var doc = this;
    User.findByIdAndUpdate({_id: this._id }, {$inc: { user_id: 1} }, function(error, User)   {
        if(error)
            return next(error);
        doc.testvalue = User.user_id;
        next();
    });
});*/


// module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);


