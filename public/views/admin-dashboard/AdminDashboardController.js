app.controller('AdminDashboardController', ['LoginService', 'AdminService', '$state', '$interval', function(LoginService, AdminService, $state, $interval) {
	var vm = this;
	
	LoginService.getUser()
		.then(function(result) {
			// if (!result.isAdmin) {
			// 	return $state.go('home');
			// }
			
			vm.user = result;
		});
	
	vm.getNewUsers = function() {
		AdminService.getNewUsers()
			.then(function(result) {
				vm.newUsers = result;
			});
	}();
	
	$interval(vm.getNewUsers, 30000);
}]);