/// <reference path="../../typings/angularjs/angular.d.ts" />
var app = angular.module('MainApp', ['ui.router', 'ngMaterial', 'perfectParallax']);
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
        })
            .state('account', {
            url: '/account',
            templateUrl: '/views/account/account-template.html',
            controller: 'AccountController',
            controllerAs: 'vm'
        })
            .state('feedback', {
            url: '/feedback',
            templateUrl: '/views/feedback/feedback-template.html',
            controller: 'FeedbackController',
            controllerAs: 'vm'
        })
            .state('calendar', {
            url: '/calendar',
            templateUrl: '/views/calendar/calendar-template.html',
            controller: 'CalendarController',
            controllerAs: 'vm'
        })
            .state('gallery', {
            url: '/gallery',
            templateUrl: '/views/gallery/gallery-template.html',
            controller: 'GalleryController',
            controllerAs: 'vm'
        });
        $urlRouterProvider.otherwise('/');
    }]);
// MAIN CONTROLLER (Controller for main page)
/// <reference path="app.ts" />
app.controller('MainController', ['LoginService', '$scope', function (LoginService, $scope) {
        var vm = this;
        vm.currentUser = {};
        LoginService.getUser()
            .then(function (result) {
            vm.currentUser = result;
        });
        vm.isMainOpen = false;
        vm.openMain = function () {
            vm.isMainOpen = true;
        };
        vm.closeMain = function () {
            vm.isMainOpen = false;
        };
        vm.logout = function () {
            LoginService.logout();
        };
        $scope.$watch(function () {
            return LoginService.currentUser;
        }, function (newValue) {
            vm.currentUser = newValue;
        });
    }]);
// MAIN SERVICE (So far hasn't needed to be used, may be removed later)
/// <reference path="app.ts" />
app.service('MainService', [function () {
        var svc = this;
    }]);
