//Booking Schema

//load MongoDB driver
var mongoose = require('mongoose');

//Defining the driver location schema
var BookingSchema = new mongoose.Schema({
	user_id: String,
	longitude: Number,
	latitude: Number,
	date_of_trip: String,
	time_of_trip: String,
	driver_id: String
});

module.exports = mongoose.model('Booking', BookingSchema);