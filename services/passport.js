var passport = require('passport'),
	config = require('../config'),
	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	
	User = require('../Models/UserModel');



passport.use(new LocalStrategy(
	function(username, password, done) {
	User.findOne({ username: username })
		.exec(function(err, user) {
			if (err)
				done(err);
			
			if (!user)
				return done(null, false);
			
			if (user.verifyPassword(password))
				return done(null, user);
			
			return done(null, false);
		});
}));

passport.use(new FacebookStrategy({
	clientID: config.facebookId,
	clientSecret: config.facebookSecret
}, function(token, refreshToken, profile, done) {
	console.log('token', token);
	console.log('profile', profile);
	return done(null, profile);
}));



passport.use(new TwitterStrategy({
	consumerKey: config.twitterId,
	consumerSecret: config.twitterSecret,
	callbackURL: 'http://www.example.com/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {
	User.findOrCreate({ displayName: name }, function(err, user) {
		if (err)
			return done(err);
		
		done(null, user);
	});
}))

passport.use(new GoogleStrategy({
	returnURL: 'http://localhost:8877/#/register/step-2',
	realm: 'http://localhost:8877/'
}, function(identifier, profile, done) {
	User.findOrCreate({ openId: identifier }, function(err, user) {
		done(err, user);
	});
}));



passport.serializeUser(function(user, done) {
	done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
	User.findById(_id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport;