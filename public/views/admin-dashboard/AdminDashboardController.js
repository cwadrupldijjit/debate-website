app.controller('AdminDashboardController', ['LoginService', 'AdminService', '$scope', '$state', '$interval', function(LoginService, AdminService, $scope, $state, $interval) {
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
	
	vm.acceptNewUser = function(userIndex) {
		AdminService.acceptNewUser(vm.newUsers[userIndex])
			.then(function(result) {
				console.log('Success!');
			}, function(err) {
				console.log(err);
			});
	};
	
	vm.declineNewUser = function(userIndex) {
		
	};
	
	$interval(vm.getNewUser, 30000);
}]);