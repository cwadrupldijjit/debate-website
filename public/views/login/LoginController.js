/* global app */
// testing to see if user authentication worked.
app.controller('LoginController', ['LoginService', '$location', function(LoginService, $location) {
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
				
				$location.path('#/user/' + vm.currentUser._id);
				// console.log(vm.currentUser);
			});
		
	};
	
	// vm.login_facebook = function() {
	// 	LoginService.login_facebook()
	// 		.then(function(result) {
	// 			vm.currentUser = result.data;
	// 		});
	// };
}]);