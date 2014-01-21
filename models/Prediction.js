var mongoose = require('mongoose');

var PredictionSchema = new mongoose.Schema({
	name : String,
	prediction : String,
	deadline: Date,
	created: Date
});

var Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = Prediction;