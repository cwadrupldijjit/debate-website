app.controller('AdminDashboardController', ['LoginService', 'AdminService', 'FeedbackService', '$scope', '$state', '$interval', function(LoginService, AdminService, FeedbackService, $scope, $state, $interval) {
	var vm = this;
	
	LoginService.getUser()
		.then(function(result) {
			if (!result.isAdmin) {
				return $state.go('home');
			}
			
			vm.user = result;
		});
	
	vm.getFeedback = function() {
		FeedbackService.getFeedback()
			.then(function(result) {
				vm.feedback = result;
			});
	}();
	
	vm.markFeedbackComplete = function(feedbackIndex) {
		FeedbackService.archiveFeedback(vm.feedback[feedbackIndex]._id)
			.then(function(result) {
				console.log(result);
			}, function(err) {
				console.log(err);
			});
	};
	
	
	vm.getNewUsers = function() {
		AdminService.getNewUsers()
			.then(function(result) {
				vm.newUsers = result;
			});
	}();
	
	vm.acceptNewUser = function(userIndex) {
		AdminService.acceptNewUser(vm.newUsers[userIndex])
			.then(function(result) {
				console.log('Success!', result);
				vm.newUsers.splice(userIndex, 1);
			}, function(err) {
				console.log(err);
			});
	};
	
	vm.declineNewUser = function(userIndex) {
		AdminService.declineNewUser(vm.newUsers[userIndex])
			.then(function(result) {
				console.log(result);
				vm.newUsers.splice(userIndex, 1);
			}, function(err) {
				console.log(err);
			});
	};
}]);