app.controller('RegisterController', ['LoginService', '$state', function(LoginService, $state) {
	var vm = this;
	
	LoginService.getUser()
		.then(function(result) {
			if (result.username) {
				$state.go('user-dashboard');
			}
		});
	
	vm.reg_step = 1;
	
	vm.verify_local = function() {
		LoginService.verify_reg_local({
			username: vm.newUsername,
			password: vm.newPassword,
			confirmPassword: vm.confirmPassword
		}).then(function(result) {
			// notificationBubble(result.msg);
			if (result.data === false) {
				vm.reg_step = 2;
			} else console.error(result)
		}, function(err) {
			console.error(err);
		});
	};
	
	vm.takeFromOAuth = function() {
		
	};
	
	vm.verify_step2 = function() {
		if (!vm.newFirstName && !vm.newLastName && !vm.newEmail) {
			console.log('You need to fill in the form before you submit it.');
		} else if ( ((vm.newFirstName && vm.newLastName) || vm.OAuthData) && vm.newEmail ) {
			vm.reg_step = 3;
		}
	};
	
	vm.verify_step3 = function() {
		// if ( (vm.securityQ1 && vm.securityA1) &&
		// 	 (vm.securityQ2 && vm.SecurityA2) &&
		// 	 (vm.securityQ3 && vm.securityA3) ) {
			
			LoginService.createUser({
				name: vm.newFirstName + ' ' + vm.newLastName,
				username: vm.newUsername,
				email: vm.newEmail,
				password: vm.newPassword,
				createdOn: new Date(),
				security: {
					questions: [
						{ questionNum: 1, question: vm.securityQ1, answer: vm.securityA1 },
						{ questionNum: 2, question: vm.securityQ2, answer: vm.securityA2 },
						{ questionNum: 3, question: vm.securityQ3, answer: vm.securityA3 }
					]
				}
			})
				.then(function(result) {
					// console.log(result);
					vm.currentUser = result.data.data;
				});
			
			vm.reg_step = 4;
		// }
	};
}]);