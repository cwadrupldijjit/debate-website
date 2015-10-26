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
		AdminService.getNewUsers();
	}();
	
	$scope.$watch(function() {
		return AdminService.newUsers;
	}, function(newData) {
		vm.newUsers = newData;
	});
}]);