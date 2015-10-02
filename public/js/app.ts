/// <reference path="../../typings/angularjs/angular.d.ts" />
// / <reference path="../../typings/" />

var app = angular.module('MainApp', ['ngRoute', 'ngMaterial', 'perfectParallax']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../views/home/home-template.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
}]);