/// <reference path="app.ts" />

app.controller('MainController', ['LoginService', '$scope', function(LoginService, $scope) {
	var vm = this;
	
	vm.currentUser = {};
	
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
		function() {
			return LoginService.currentUser;
		},
		function(newValue) {
			vm.currentUser = newValue;
		}
	);
}]);