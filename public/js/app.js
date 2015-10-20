/// <reference path="../../typings/angularjs/angular.d.ts" />
var app = angular.module('MainApp', ['ngRoute', 'ui.router', 'ngMaterial', 'perfectParallax']);
app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        // $routeProvider
        // 	.when('/', {
        // 		templateUrl: '../views/home/home-template.html',
        // 		controller: 'HomeController',
        // 		controllerAs: 'vm'
        // 	})
        // 	.otherwise({redirectTo: '/'});
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: '../views/home/home-template.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
            .state('login', {
            url: '/login',
            templateUrl: '../views/login/login-template.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
            .state('register', {
            url: '/register',
            templateUrl: '/views/login/register-template.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/');
    }]);
