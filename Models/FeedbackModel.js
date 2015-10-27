var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	reason: {type: String, required: true},
	summary: {type: String, required: true}
});

module.exports = mongoose.model('Feedback', schema);