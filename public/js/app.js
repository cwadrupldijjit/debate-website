/// <reference path="../../typings/angularjs/angular.d.ts" />
var app = angular.module('MainApp', ['ngRoute', 'ui.router', 'ngMaterial', 'perfectParallax']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
        })
            .state('user-dashboard', {
            url: '/dashboard',
            templateUrl: '/views/user-dashboard/user-dashboard-template.html',
            controller: 'UserDashboardController',
            controllerAs: 'vm'
        })
            .state('admin-dashboard', {
            url: '/admin',
            templateUrl: '/views/admin-dashboard/admin-dashboard-template.html',
            controller: 'AdminDashboardController',
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/');
    }]);
