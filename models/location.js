//load MongoDB driver
var mongoose = require('mongoose');

//Defining the driver location schema
var LocationSchema = new mongoose.Schema({
	longitude: Number,
	latitude: Number,
	driver_id: String,
});

module.exports = mongoose.model('Location', LocationSchema);
