/* global app */
// testing to see if user authentication worked.
app.controller('LoginController', ['LoginService', function(LoginService) {
	var vm = this;
	
	vm.test = 'test';
	
	vm.login_local = function() {
		var result = LoginService.login_local({
			username: vm.username,
			password: vm.password
		});
		
		if (!result) {
			return console.log(result);
		}
		
		vm.currentUser = result;
		console.log('this worked');
	};
	
	vm.login_facebook = function() {
		LoginService.login_facebook().then(function(result) {
			vm.currentUser = result.data;
		});
	};
}]);