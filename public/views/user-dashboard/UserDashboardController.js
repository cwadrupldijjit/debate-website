app.controller('UserDashboardController', ['LoginService', '$stateParams', function(LoginService, $stateParams) {
	var vm = this;
	
	LoginService.isAuthed();
	
	console.log($stateParams.id);
}]);