var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	TwitterStrategy = require('passport-twitter').Strategy,
	GoogleStrategy = require('passport-google').Strategy,
	
	User = require('../Models/UserModel');

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, function(username, password, done) {
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

passport.serializeUser(function(user, done) {
	done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
	User.findById(_id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport;