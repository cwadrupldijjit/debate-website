/* global app */
// testing to see if user authentication worked.
app.controller('LoginController', ['LoginService', '$location', '$state', function(LoginService, $location, $state) {
	var vm = this;
	
	vm.test = 'test';
	
	vm.login_local = function() {
		LoginService.login_local({
			username: vm.username,
			password: vm.password
		})
			.then(function(result) {
				
				if (!result.username) {
					return console.log(result);
				}
				
				vm.currentUser = result;
				
				$state.go('user-dashboard');
			});
		
	};
	
	// vm.login_facebook = function() {
	// 	LoginService.login_facebook()
	// 		.then(function(result) {
	// 			vm.currentUser = result.data;
	// 		});
	// };
}]);