/// <reference path="app.ts" />

app.controller('MainController', ['LoginService', '$scope', function(LoginService, $scope) {
	var vm = this;
	
	LoginService.getUser();
	
	vm.isMainOpen = false;
	
	vm.openMain = function() {
		vm.isMainOpen = true;
	};
	
	vm.closeMain = function() {
		vm.isMainOpen = false;
	};
	
	vm.logout = function() {
		LoginService.logout();
	};
	
	$scope.$watch(
		LoginService.getUser(),
		function(newValue) {
			console.log(newValue);
		}
	);
}]);