app.controller('UserDashboardController', ['LoginService', '$stateParams', function(LoginService, $stateParams) {
	var vm = this;
	vm.user = {};
	
	LoginService.isAuthed()
		.then(function(result) {
			vm.user = result;
		});
}]);