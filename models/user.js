var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	email: {
	type: String,
	unique: true,
	required: true
	},
	password: {
	type: String,
	unique: true
	},
	name: {
	type: String,
	required: true
	},
	number: {
	type: Number,
	required: true
	}
});

//execute before each user.save() call
UserSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')) 
		return next;

	bcrypt.genSalt(5, function(err,salt) {
		if(err)
			return next(err);

		bcrypt.has(user.password, salt, null, function(err,hash) {
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

module.exports = mongoose.model('User', UserSchema);


