// MAIN CONTROLLER (Controller for main page)

/// <reference path="app.ts" />

app.controller('MainController', ['LoginService', '$scope', function(LoginService:any, $scope:any) {
	var vm = this;
	
	vm.currentUser = {};
	
	LoginService.getUser()
		.then(function(result:any) {
			vm.currentUser = result;
		});
	
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
		function(newValue:any) {
			vm.currentUser = newValue;
		}
	);
}]);