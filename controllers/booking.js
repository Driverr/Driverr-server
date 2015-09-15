//Bookings controller


//Load required packages

var Book = require('../models/booking');


/***********************************************
GET Booking 
***********************************************/
//Create endpoint /api/booking for GET


exports.getBooking = function(req, res) {
	Book.find(function(err, books) {
		if (err) 
			res.send(err);
		res.json(books);
	});
};


/***********************************************
POST Booking 
***********************************************/
//Create endpoint /api/booking for POST


exports.postBooking = function(req, res) {
	if(!req.body.cust_id || !req.body.latitude || !req.body.longitude || !req.body.date_of_trip || !req.body.time_of_trip) {
		res.json({ message: 'Missing field. Please provide all details.' });
		return;
	}

	var date = new Date().getTime();

	var padded = date.toString(16);

	var book = new Book({

		user_id: req.body.cust_id,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		date_of_trip: req.body.date_of_trip,
		time_of_trip: req.body.time_of_trip

	});

	book.save(function(err) {
		if (err){
			console.log("The error is:" + err);
			res.json({message: 'Sorry! Please try again.'});
			return;
		}
		
		else {
		res.json({ success: 'Booking successful!' });	
		//have to send back driver_id and other details 
		}
		
	});

};

