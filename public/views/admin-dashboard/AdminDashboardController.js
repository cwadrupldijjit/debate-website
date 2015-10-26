app.controller('AdminDashboardController', ['LoginService', '$state', function(LoginService, $state) {
	var vm = this;
	
	LoginService.getUser()
		.then(function(result) {
			if (!result.isAdmin) {
				return $state.go('home');
			}
			
			vm.user = result;
		});
}]);