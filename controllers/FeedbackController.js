var Feedback = require('../models/FeedbackModel');

module.exports = {
	addNew: function(req, res) {
		var newFeedback = new Feedback(req.body);
		newFeedback.save(function(err, feedback) {
			if (err)
				return res.send(err);
			
			res.json(feedback);
		});
	},
	
	removeOne: function(req, res) {
		
	}
};