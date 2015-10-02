/// <reference path="app.ts" />

app.controller('MainController', function() {
	var vm = this;
	
	vm.isMainOpen = false;
	
	vm.openMain = function() {
		vm.isMainOpen = true;
	};
	
	vm.closeMain = function() {
		vm.isMainOpen = false;
	};
});