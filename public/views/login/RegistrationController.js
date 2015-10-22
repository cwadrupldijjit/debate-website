app.controller('RegisterController', ['LoginService', function(LoginService) {
	var vm = this;
	
	vm.reg_step = 1;
	
	vm.verify_local = function() {
		LoginService.verify_reg_local({
			username: vm.newUsername,
			password: vm.newPassword,
			confirmPassword: vm.confirmPassword
		}).then(function(result) {
			// notificationBubble(result.msg);
			if (result.data.data === false) {
				vm.reg_step = 2;
			}
		});
	};
	
	vm.takeFromOAuth = function() {
		
	};
	
	vm.verify_step2 = function() {
		if (!vm.newFirstName && !vm.newLastName && !vm.newEmail) {
			console.log('You need to fill in the form before you submit it.');
		} else if ( ((vm.newFisrtName && vm.newLastName) || vm.OAuth_data) && vm.newEmail ) {
			vm.reg_step = 3;
		}
	};
	
	vm.verify_step3 = function() {
		// if
	};
}]);