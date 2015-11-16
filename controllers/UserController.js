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
		});
	},
	
	me: function(req, res) {
		if (!req.user)
			return res.send('current user not defined');
		
		req.user.password = null;
		return res.json(req.user);
	},
	
	updateAccount: function(req, res, done) {
		User.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
			if (err)
				done(err);
			
			// res.sendStatus(200)
			res.json(result);
		})
	},
	
	checkUsername: function(req, res) {
		var username = req.params.username;
		
		User.findOne({username: username})
			.exec(function(err, user) {
				if (err)
					return res.send(err);
				
				else if (user)
					res.json(true);
				
				else PendingUser.findOne({username: username})
							   .exec(function(err, user) {
								   if (err) {
									   console.error(err)
								   } else if (user) {
									   res.json(true)
								   } else res.json(false);
							   });
			});
	},
	
	all: function(req, res) {
		User.find()
			.exec(function(err, users) {
				if (err)
					return res.send(err)
				
				res.json(users)
			});
	},
	
	allNew: function(req, res) {
		PendingUser.find()
			.exec(function(err, users) {
				if (err)
					return res.send(err);
				
				res.json(users);
			});
	},
	
	acceptUser: function(req, res) {
		PendingUser.findOne({_id: req.params.id})
			.exec(function(err, user) {
				if (err)
					return res.send(err);
				
				var acceptedUser = new User(user);
				acceptedUser.save(function(err, user) {
					if (err)
						return res.send(err);
					
					res.json(user);
				});
				
				PendingUser.findByIdAndRemove(user._id)
					.exec(function(err, user) {
						if (err)
							// return res.send(err);
							console.log(err);
						
						// res.json(user);
					});
			});
	},
	
	declineUser: function(req, res) {
		PendingUser.findByIdAndRemove(req.params.id)
			.exec(function(err, done) {
				if (err) {
					return res.send(err);
				}
				
				res.json(done);
			});
	}
};