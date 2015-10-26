/* global app */
// testing to see if user authentication worked.
app.controller('LoginController', ['LoginService', '$location', '$state', function(LoginService, $location, $state) {
	var vm = this;
	
	LoginService.getUser()
		.then(function(result) {
			if (result.username) {
				$state.go('user-dashboard');
			}
		});
	
	vm.login_local = function() {
		LoginService.login_local({
			username: vm.username,
			password: vm.password
		})
			.then(function(result) {
				console.log(result);
				if (!result.username) {
					return console.log(result);
				} else if (result.isAdmin) {
					$state.go('admin-dashboard');
				} else {
					vm.currentUser = result;
					
					$state.go('user-dashboard');
				}
			});
	};
	
	// vm.login_facebook = function() {
	// 	LoginService.login_facebook()
	// 		.then(function(result) {
	// 			vm.currentUser = result.data;
	// 		});
	// };
}]);