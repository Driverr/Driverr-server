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
		time_of_trip: req.body.time_of_trip,
		time_of_booking: date

	});

	book.save(function(err) {
		if (err){
			console.log("The error is:" + err);
			res.json({message: 'Sorry! Please try again.'});
			return;
		}
		
		else {
		res.json({ res: true, 
			//id: driver_id,
			response: 'Booking successful!'
			 });	
		//have to send back driver_id and other details 
		//mailerNotif (user_email, user_name);
		}
		
	});

};



/***********************************************
Mail notification on booking
***********************************************/
//Server should email on incoming booking

/*
function mailerNotif (user_email, user_name) {



var nodemailer = require('nodemailer');
 
// create reusable transporter object using SMTP transport 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'getdriverr@gmail.com',
        pass: 'userpass'
    }
});
 
// NB! No need to recreate the transporter object. You can use 
// the same transporter object for all e-mails 
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: 'Driverr ✔ <getdriverr@gmail.com>', // sender address 
    to: 'Shivalik Sen <shvlksen@gmail.com>', // list of receivers 
    subject: 'Howdy! Booking made!', // Subject line 
    text: 'Howdy ' + user_email + '! Your booking has been confirmed. 
    Our driver will be there 5 minutes before the designated time.', // plaintext body 
    html: '<b>Hello world ✔</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
 
});

}

*/