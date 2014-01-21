var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	oauthId : Number,
	provider: String,
	name : String,
	username: String,
	created : Date
});

var User = mongoose.model('User', UserSchema);

module.exports = User;