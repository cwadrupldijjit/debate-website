app.controller('RegisterController', ['LoginService', function(LoginService) {
	var vm = this;
	
	vm.reg_step = 1;
	
	vm.verify_local = function() {
		LoginService.verify_reg_local({
			username: vm.newUsername,
			password: vm.newPassword,
			confirmPassword: vm.confirmPassword
		}).then(function(result) {
			console.log(result);
		});
	};
}]);