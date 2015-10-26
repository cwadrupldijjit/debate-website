var User = require('../Models/UserModel');
var PendingUser = require('../Models/PendingUserModel');

module.exports = {
	
	register: function(req, res) {
		var newUser = new PendingUser(req.body);
		newUser.save(function(err, user) {
			if (err)
				return res.send(err);
			
			user.password = null;
			return res.send(user);
		})
	},
	
	me: function(req, res) {
		if (!req.user)
			return res.send('current user not defined');
		
		req.user.password = null;
		return res.json(req.user);
	},
	
	update: function(req, res, done) {
		User.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
			if (err)
				done(err);
			
			res.sendStatus(200);
		})
	},
	
	checkUsername: function(req, res) {
		var username = req.params.username;
		
		User.find({username: username})
			.exec(function(err, user) {
				if (err)
					return res.send(err);
				
				if (!user.username)
					return res.json(false);
				
				res.json(true);
			});
	},
	
	all: function(req, res) {
		User.find();
	},
	
	allNew: function(req, res) {
		PendingUser.find()
			.exec(function(err, users) {
				console.log(err);
				console.log(users);
				if (err)
					return res.send(err);
				
				res.json(users);
			})
	}
};