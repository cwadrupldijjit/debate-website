app.controller('FeedbackController', ['LoginService', '$state', function(LoginService, $state) {
	var vm = this;
	
	LoginService.getUser()
		.then(function(result) {
			if (!result.username)
				return $state.go('home'); 
			
			vm.currentUser = result;
		});
	
	
}]);