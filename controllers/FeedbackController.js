var Feedback = require('../Models/FeedbackModel');
var ArchiveFeedback = require('../Models/FeedbackArchiveModel');

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
		Feedback.findOne({_id: req.params.id})
			.exec(function(err, feedback) {
				if (err)
					return res.send(err);
				
				var archivedFeedback = new ArchiveFeedback(feedback);
				archivedFeedback.save(function(err, feedback) {
					if (err)
						return res.send(err);
					
					res.json(feedback);
				});
				
				Feedback.findByIdAndRemove(feedback._id)
					.exec();
			});
	},
	
	read: function(req, res) {
		Feedback.find({})
			.populate('user')
			.exec(function(err, feedback) {
				if (err)
					return res.send(err);
				
				res.json(feedback);
			});
	}
};
