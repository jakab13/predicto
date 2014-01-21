var fs = require('fs');
var express = require('express');
var path = require('path');
var util = require('util');
var app = express();

// Models
var Prediction = require('./models/Prediction.js');
var User = require('./models/User.js');
// Routes
var user = require('./routes/user.js');
var prediction = require('./routes/prediction.js');
// Login
var passport = require('passport');
var authentication = require('./authentication/authentication.js');

// Database
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/predicto");
// mongoose.connect('mongodb://nodejitsu_jakab13:8dha0j7vnltaqskveth5oikkuk@ds045988.mongolab.com:45988/nodejitsu_jakab13_nodejitsudb5128836978');
var db = mongoose.connection;

// Configurations
app.configure(function() {
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({
		secret : 'SECRET'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '/public')));
	app.engine('html', require('ejs').renderFile);
});

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		// console.log(user);
		if (!err)
			done(null, user);
		else
			done(err, null);
	});
});

app.get('/home', ensureAuthenticated, function(req, res) {
	User.findById(req.session.passport.user, function(err, user) {
		if (err) {
			console.log(err);
		} else {
			res.render('home.html', {
				user : user
			});
		}
	});
});

app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
});

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	failureRedirect : '/'
}), function(req, res) {
	res.redirect('/home');
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// SIGN UP

//app.get("/users/signup", function(req, res) {
//	res.render('users/signup.html');
//});
app.get("/users", user.list);
app.param("name", user.load);
app.get("/users/:name", user.view);

app.get("/", function(req, res) {
	res.render('index.html');
});

// PREDICTIONS
app.post("/predictions", prediction.submit);
app.param("predictionId", prediction.load);
app.get("/predictions/:predictionId", prediction.view);
app.get("/predictions", prediction.viewAll);

app.listen(3000);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}