//Driver DB Schema

//load MongoDB driver
var mongoose = require('mongoose');

//Defining the driver location schema
var DriverSchema = new mongoose.Schema({
	driver_id:{
	type: String,
	//require: true,
	unique: true
	},

	driver_name: {
	type: String,
	//unique: true,
	//required: true
	},

	password: {
	type: String,
	//unique: true,
	required: true
	},

	email: {
	type: String,
	unique: true,
	required: true
	},

	number: {
	type: Number,
	// required: true,
	unique: true
	}
});

module.exports = mongoose.model('drivers', DriverSchema);
