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
		//emailing booking details 
		console.log("booking successfuly received with the following details: ");
		console.log(book.user_id + ", " + book.latitude + ", " + book.longitude  + ", " + book.date_of_trip + ", " + book.time_of_trip  );
			

		var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
		var email = new sendgrid.Email({
			to: 'shvlksen@gmail.com',
			from: 'support@getdriverr.com',
			subject: 'New Booking received!',
			text: ("New booking with the following details received:\n User ID: " + book.user_id + ", \n Latitude: " + book.latitude+ ", \n Longitude: " + book.longitude + ", \n Date of Tripe: " + book.date_of_trip + ", \n Time of Trip: " + book.time_of_trip + ". \nLet's do this ride perfectly!"),
			
		});
		sendgrid.send(email, function(err,json) {
			if(err)
				return console.error(err);
			console.log(json);
		});

		res.json({ success: 'Booking successful!' });	

		}
		
	});

};




/***********************************************
POST PairBooking 
***********************************************/
//Create endpoint /api/pairbooking for POST

/*

	user_id: String;
	start_long: Number;
	start_lat: Number;
	end_long: Number;
	end_lat: Number;
	date_of_trip: Date;
	start_time: Date;
	return_time: Date;

*/

exports.postPairBooking = function(req, res) {
	if(!req.body.cust_id || !req.body.start_lat || !req.body.start_long || !req.body.end_lat || !req.body.end_long || !req.body.date_of_trip || !req.body.start_time || !req.body.return_time ) {
		res.json({ message: 'Missing field. Please provide all details.' });
		return;
	}

	var date = new Date().getTime();

	var padded = date.toString(16);

	var book = new PairBook({

		user_id: req.body.cust_id,
		start_lat: req.body.start_lat,
		start_long: req.body.start_long,
		end_lat: req.body.end_lat,
		end_long: req.body.end_long,
		date_of_trip: req.body.date_of_trip,
		start_time: req.body.start_time,
		return_time: req.body.return_time,
		time_of_booking: date

	});

	book.save(function(err) {
		if (err){
			console.log("The error is:" + err);
			res.json({message: 'Sorry! Please try again.'});
			return;
		}
		
		else {
		//emailing booking details 
		console.log("booking successfuly received with the following details: ");
		console.log(book.user_id + ", " + book.start_lat + ", " + book.start_long  + ", " + book.end_lat + ", " + book.end_long + ", " + book.start_time  + ", " + book.return_time  + ", " + book.date_of_trip   );
			

		var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
		var email = new sendgrid.Email({
			to: 'shvlksen@gmail.com',
			from: 'support@getdriverr.com',
			subject: 'New Booking received!',
			text: ("New booking with the following details received:\n User ID: " + book.user_id + ", \n Pickup Latitude: " + book.start_lat +
			 ", \n Pickup Longitude: " + book.start_long + ", \n Return Latitude: " + book.end_lat  + ", \n Return Longitude: " +
			 book.end_long + ", \n Pickup Time: "  + book.start_time + ", \n Return Time: " + book.return_time  + ", \n Date of Trip: " +
			 book.date_of_trip + ". \n Let's do this ride perfectly!"),
			
		});

		email.addCC('arungandhinew@gmail.com');
		email.addCC('nikhil.tavora@gmail.com');
		email.addCC('aman.official93@gmail.com');
		email.addCC('garrygold.007@gmail.com');
		
		sendgrid.send(email, function(err,json) {
			if(err)
				return console.error(err);
			console.log(json);
		});

		res.json({ success: 'Booking successful!' });	

		}
		
	});

};





/***********************************************
Mail notification on booking
**********************************************
//Server should email on incoming booking
//Not using any of this now
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

//Not using any of this now
**********************************************/