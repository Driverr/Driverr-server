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
	driver_id: String,
	time_of_booking: String
});

var PairBookingSchema = new mongoose.Schema({
	user_id: String;
	start_long: Number;
	start_lat: Number;
	end_long: Number;
	end_lat: Number;
	date_of_trip: Date;
	start_time: Date;
	return_time: Date;
	time_of_booking: Date;
});

module.exports = mongoose.model('Booking', BookingSchema);
module.exports = mongoose.model('PairBooking', PairBookingSchema);
