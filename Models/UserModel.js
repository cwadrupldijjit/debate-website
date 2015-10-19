var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
	name: 		{ type: String,  maxLength: 80, required: true },
	username: 	{ type: String,  maxlength: 30, required: true },
	email: 		{ type: String,  maxlength: 60, required: true },
	password: 	{ type: String,  required: true },
	createdOn: 	{ type: Date,    default: new Date() },
	isAdmin: 	{ type: Boolean, default: false },
	linkedProviders: { facebook: { facebookId: String, displayName: String }, 
					   twitter: { twitterId: String, displayName: String }, 
					   google: { googleId: String, displayName: String } },
	security: { questions: [ { questionNum: { type: Number }, question: String, answer: String } ], 
				backupEmail: String,
				privacyOptions: { 
					showFullName: 	 { type: Boolean, default: false },
					showEmail: 		 { type: Boolean, default: false },
					showFacebookUrl: { type: Boolean, default: false },
					showTwitterUrl:  { type: Boolean, default: false },
					showGoogleUrl:   { type: Boolean, default: false }
				}
	},
	bio: { type: String, maxlength: 300, default: 'This person has no life.  Otherwise, they would put their bio here.' }
	
});

schema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))
		return next();
	
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;
	return next(null, user);
});

schema.methods.verifyPassword = function(reqBodyPassword) {
	var user = this;
	return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', schema);