/// <reference path="../../js/app.ts" />

app.controller('HomeController', ['LoginService', function(LoginService) {
	var vm = this;
	
	vm.testUser = function() {
		LoginService.getUser();
	};
}]);