app.controller('FeedbackController', ['LoginService', 'AdminService', 'FeedbackService', '$state', function(LoginService, AdminService, FeedbackService, $state) {
	var vm = this;
	
	vm.reasons = [
		'Great website!',
		'Stupid website!',
		'Ran into error',
		'Other'
	];
	// vm.feedbackReason
	
	LoginService.getUser()
		.then(function(result) {
			if (!result.username)
				return $state.go('home'); 
			
			vm.currentUser = result;
		});
	
	vm.sendFeedback = function() {
		if (vm.feedbackReason.indexOf('Other') >= 0) {
			if (vm.feedbackReason && vm.feedbackSummary) {
				FeedbackService.submitFeedback({
					userId: vm.currentUser._id,
					reason: vm.feedbackReason,
					summary: vm.feedbackSummary
				});
			} else {
				console.log('Please fill out the explanation before continuing');
			}
		} else {
			if (vm.feedbackReason) {
				FeedbackService.submitFeedback({
					user: vm.currentUser._id,
					reason: vm.feedbackReason,
					summary: vm.feedbackSummary
				});
			}
		}
	};
}]);