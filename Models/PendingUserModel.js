var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



// -------------------------------------------   USER SCHEMA

var schema = new mongoose.Schema({
	name: 		{ type: String,  maxLength: 80, required: true },
	username: 	{ type: String,  maxlength: 30, required: true },
	email: 		{ type: String,  maxlength: 60, required: true },
	password: 	{ type: String },
	createdOn: 	{ type: Date, required: true },
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
				},
	},
	bio: { type: String, maxlength: 300, default: 'This person has no life.  Otherwise, they would add their bio here.' },
	stats: { numPosts: { type: Number, default: 0 }, thanked: { type: Number, default: 0 }, lastLoggedOn: Date },
	avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UserAvatar.svg/2000px-UserAvatar.svg.png' },
	signature: {
		use: { type: Boolean, default: false },
		body: String
	}
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

module.exports = mongoose.model('Pending-User', schema);