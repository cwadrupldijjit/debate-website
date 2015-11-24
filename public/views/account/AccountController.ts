app.controller('AccountController', ['LoginService', '$state', function(LoginService, $state) {
	var vm = this;
	
	vm.tabNum = 1;
	vm.currentUser;
	vm.tempUser = {};
	vm.tempEmail = '';
	
	vm.isSelected = function(tabNum) {
		if (tabNum === vm.tabNum) {
			return "selected-tab";
		}
	};
	
	vm.setTab = function(num) {
		vm.tabNum = num;
	};
	
	function getCurrentUser() {
		LoginService.getUser()
			.then(function(result) {
				if (!result.username)
					return $state.go('home');
				
				vm.currentUser = result;
				for (var key in result) {
					if (angular.lowercase(typeof result[key]) === 'string')
						vm.tempUser[key] = result[key].slice();
					
					else if (angular.lowercase(typeof result[key]) === 'array')
						vm.tempUser[key] = result[key];
				}
				vm.email = vm.tempUser.email;
			});
	};
	
	getCurrentUser();
	
	vm.standardBio = "This person has no life. Otherwise, they would add their bio here.";
	
	vm.editModeOn = {
		username: false,
		email: false,
		bio: false,
		facebookUrl: false,
		twitterUrl: false,
		linkedinUrl: false
	};
	
	vm.editItem = function(elem) {
		//function that when called will set the editModeOn value for the particular item
		switch(elem) {
			case 'username': vm.editModeOn.username = true; vm.tempEmail += vm.tempUser.username; break;
			case 'email': vm.editModeOn.email = true;  vm.tempEmail += vm.tempUser.email; break;
			case 'bio': vm.editModeOn.bio = true; break;
			case 'facebookUrl': vm.editModeOn.facebookUrl = true; break;
			case 'twitterUrl': vm.editModeOn.twitterUrl = true; break;
			case 'linkedinUrl': vm.editModeOn.linkedinUrl = true; break;
		}
	};
	
	vm.cancelEdit = function(elem) {
		
		vm.editModeOn[elem] = false;
		if (elem === 'email') {
			return vm[elem] = vm.currentUser[elem].slice();
		}
		
		vm.tempUser[elem] = vm.currentUser[elem].slice();
	};
	
	vm.updateItem = function(element) {
		
		// POSSIBLE:  confirm the user wants to do this
		// call the $updateemail service in angularfire
		// update it in the users array as well
		if(element === 'email') {
			if (confirm('Are you sure you want to change your email?')) {
				
				LoginService.editItem({
					email: vm.email,
					id: vm.currentUser._id
				})
					.then(function(result) {
						vm.tempUser.email = vm.email;
						vm.editModeOn.email = false;
						
						getCurrentUser();
					});
			}
		} else {
			var updateObj = {};
			
			updateObj[element] = vm.tempUser[element];
		}
		
	};
}]);