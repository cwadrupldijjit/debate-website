app.controller('UserDashboardController', ['LoginService', function(LoginService) {
	var vm = this;
	
	LoginService.isAuthed();
}]);