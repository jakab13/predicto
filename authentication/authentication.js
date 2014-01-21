var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./../models/User.js');
var oauthConfig = require('./oauth.js');

module.exports = passport.use(new TwitterStrategy({
	consumerKey : oauthConfig.twitter.consumerKey,
	consumerSecret : oauthConfig.twitter.consumerSecret,
	callbackURL : oauthConfig.twitter.callbackURL
}, function(token, tokenSecret, profile, done) {
	// console.log(profile);
	User.findOne({
		oauthId : profile.id
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!err && user != null) {
			done(null, user);
		} else {
			var user = new User({
				oauthId : profile.id,
				provider: 'twitter',
				name : profile.displayName,
				username: profile.username,
				created : Date.now()
			});
			user.save(function(err) {
				if (err) {
					console.log(err);
				} else {
					// console.log("saving user ...");
					done(null, user);
				}
			});
		}
		;
	});
}));