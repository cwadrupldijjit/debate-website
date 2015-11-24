angular.module('perfectParallax', []).directive('perfectParallax', [
    '$window', function ($window) {
        return {
            restrict: 'A',
            scope: {
                parallaxCss: '@',
                parallaxInitVal: '@',
                parallaxRatio: '@'
            },
            link: function (iScope, iElem, iAttr) {
                var cssKey, cssValue, isSpecialVal, parallaxCssVal, parallaxOffset, parallaxRatio, parallaxInitVal, cssValArray;
                parallaxCssVal = iScope.parallaxCss ? iScope.parallaxCss : 'top';
                cssValArray = parallaxCssVal.split(':');
                cssKey = cssValArray[0];
                cssValue = cssValArray[1];
                isSpecialVal = cssValue ? true : false;
                if (!cssValue)
                    cssValue = cssKey;
                parallaxRatio = iScope.parallaxRatio ? +iScope.parallaxRatio : 1.1;
                parallaxInitVal = iScope.parallaxInitVal ? +iScope.parallaxInitVal : 0;
                iElem.css(cssKey, parallaxInitVal + 'px');
                function _onScroll() {
                    var resultVal;
                    var calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;
                    if (isSpecialVal) {
                        resultVal = '' + cssValue + '(' + calcVal + 'px)';
                    }
                    else {
                        resultVal = calcVal + 'px';
                    }
                    iElem.css(cssKey, resultVal);
                }
                ;
                $window.addEventListener('scroll', _onScroll);
            }
        };
    }
]);
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
        $locationProvider.html5Mode(true);
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
app.directive('fileread', ['ImageService', function (ImageService) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var tempArray = elem['context'].value.split('\\');
                var filename = tempArray[tempArray.length - 1];
                elem.bind('change', function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        var fileread = loadEvent.target.result;
                        ImageService.storeImage(fileread, filename);
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }]);
app.service('ImageService', ['$http', '$q', 'LoginService', function ($http, $q, LoginService) {
        var svc = this;
        svc.storeImage = function (imageData, fileName) {
            var deferred = $q.defer();
            var imageExtension = imageData.split(';')[0].split('/');
            imageExtension = imageExtension[imageExtension.length - 1];
            var newImage = {
                imageName: fileName,
                imageBody: imageData,
                imageExtension: imageExtension,
                userEmail: LoginService.currentUser
            };
            console.log(newImage);
            $http.post('/api/new-image', newImage)
                .then(function (result) {
                deferred.resolve(result.data);
            });
            return deferred.promise;
        };
    }]);
app.controller('AccountController', ['LoginService', '$state', function (LoginService, $state) {
        var vm = this;
        vm.tabNum = 1;
        vm.currentUser;
        vm.tempUser = {};
        vm.tempEmail = '';
        vm.isSelected = function (tabNum) {
            if (tabNum === vm.tabNum) {
                return "selected-tab";
            }
        };
        vm.setTab = function (num) {
            vm.tabNum = num;
        };
        function getCurrentUser() {
            LoginService.getUser()
                .then(function (result) {
                if (!result.username)
                    return $state.go('home');
                vm.currentUser = result;
                for (var key in result) {
                    if (angular.lowercase(typeof result[key]) === 'string')
                        vm.tempUser[key] = result[key].slice();
                    else if (angular.lowercase(typeof result[key]) === 'array')
                        vm.tempUser[key] = result[key];
                }
                vm.email = vm.tempUser.email;
            });
        }
        ;
        getCurrentUser();
        vm.standardBio = "This person has no life. Otherwise, they would add their bio here.";
        vm.editModeOn = {
            username: false,
            email: false,
            bio: false,
            facebookUrl: false,
            twitterUrl: false,
            linkedinUrl: false
        };
        vm.editItem = function (elem) {
            //function that when called will set the editModeOn value for the particular item
            switch (elem) {
                case 'username':
                    vm.editModeOn.username = true;
                    vm.tempEmail += vm.tempUser.username;
                    break;
                case 'email':
                    vm.editModeOn.email = true;
                    vm.tempEmail += vm.tempUser.email;
                    break;
                case 'bio':
                    vm.editModeOn.bio = true;
                    break;
                case 'facebookUrl':
                    vm.editModeOn.facebookUrl = true;
                    break;
                case 'twitterUrl':
                    vm.editModeOn.twitterUrl = true;
                    break;
                case 'linkedinUrl':
                    vm.editModeOn.linkedinUrl = true;
                    break;
            }
        };
        vm.cancelEdit = function (elem) {
            vm.editModeOn[elem] = false;
            if (elem === 'email') {
                return vm[elem] = vm.currentUser[elem].slice();
            }
            vm.tempUser[elem] = vm.currentUser[elem].slice();
        };
        vm.updateItem = function (element) {
            // POSSIBLE:  confirm the user wants to do this
            // call the $updateemail service in angularfire
            // update it in the users array as well
            if (element === 'email') {
                if (confirm('Are you sure you want to change your email?')) {
                    LoginService.editItem({
                        email: vm.email,
                        id: vm.currentUser._id
                    })
                        .then(function (result) {
                        vm.tempUser.email = vm.email;
                        vm.editModeOn.email = false;
                        getCurrentUser();
                    });
                }
            }
            else {
                var updateObj = {};
                updateObj[element] = vm.tempUser[element];
            }
        };
    }]);
app.controller('AdminDashboardController', ['LoginService', 'AdminService', 'FeedbackService', '$scope', '$state', '$interval', function (LoginService, AdminService, FeedbackService, $scope, $state, $interval) {
        var vm = this;
        LoginService.getUser()
            .then(function (result) {
            if (!result.isAdmin) {
                return $state.go('home');
            }
            vm.user = result;
        });
        vm.getFeedback = function () {
            FeedbackService.getFeedback()
                .then(function (result) {
                vm.feedback = result;
            });
        }();
        vm.markFeedbackComplete = function (feedbackIndex) {
            FeedbackService.archiveFeedback(vm.feedback[feedbackIndex]._id)
                .then(function (result) {
                vm.feedback.splice(feedbackIndex, 1);
            }, function (err) {
                console.log(err);
            });
        };
        vm.getNewUsers = function () {
            AdminService.getNewUsers()
                .then(function (result) {
                vm.newUsers = result;
            });
        }();
        vm.acceptNewUser = function (userIndex) {
            AdminService.acceptNewUser(vm.newUsers[userIndex])
                .then(function (result) {
                vm.newUsers.splice(userIndex, 1);
            }, function (err) {
                console.log(err);
            });
        };
        vm.declineNewUser = function (userIndex) {
            AdminService.declineNewUser(vm.newUsers[userIndex])
                .then(function (result) {
                vm.newUsers.splice(userIndex, 1);
            }, function (err) {
                console.log(err);
            });
        };
    }]);
/* global app */
app.service('AdminService', ['LoginService', '$state', '$interval', '$http', '$q', function (LoginService, $state, $interval, $http, $q) {
        var svc = this;
        LoginService.getUser()
            .then(function (result) {
            if (!result.isAdmin) {
                $state.go('home');
            }
            svc.currentUser = result;
        });
        svc.getNewUsers = function () {
            var deferred = $q.defer();
            $http.get('/new-users')
                .then(function (result) {
                svc.newUsers = result.data;
                deferred.resolve(result.data);
            });
            return deferred.promise;
        };
        svc.acceptNewUser = function (user) {
            var deferred = $q.defer();
            $http.put('/new-users/' + user._id)
                .then(function (result) {
                deferred.resolve(result.data);
            });
            return deferred.promise;
        };
        svc.declineNewUser = function (user) {
            var deferred = $q.defer();
            $http.delete('/new-users/' + user._id)
                .then(function (result) {
                deferred.resolve(result);
            }, function (err) {
                console.log(err);
            });
            return deferred.promise;
        };
    }]);
app.controller('CalendarController', [function () {
        var vm = this;
        vm.test = 'test';
    }]);
app.controller('FeedbackController', ['LoginService', 'AdminService', 'FeedbackService', '$state', function (LoginService, AdminService, FeedbackService, $state) {
        var vm = this;
        vm.reasons = [
            'Great website!',
            'Stupid website!',
            'Ran into error',
            'Other'
        ];
        // vm.feedbackReason
        LoginService.getUser()
            .then(function (result) {
            if (!result.username)
                return $state.go('home');
            vm.currentUser = result;
        });
        vm.sendFeedback = function () {
            if (vm.feedbackReason.indexOf('Other') >= 0) {
                if (vm.feedbackReason && vm.feedbackSummary) {
                    FeedbackService.submitFeedback({
                        userId: vm.currentUser._id,
                        reason: vm.feedbackReason,
                        summary: vm.feedbackSummary
                    });
                }
                else {
                    console.log('Please fill out the explanation before continuing');
                }
            }
            else {
                if (vm.feedbackReason) {
                    FeedbackService.submitFeedback({
                        user: vm.currentUser._id,
                        reason: vm.feedbackReason,
                        summary: vm.feedbackSummary
                    });
                }
            }
        };
    }]);
app.service('FeedbackService', ['LoginService', 'AdminService', '$state', '$http', '$q', function (LoginService, AdminService, $state, $http, $q) {
        var svc = this;
        svc.submitFeedback = function (feedbackObj) {
            var deferred = $q.defer();
            $http.post('/feedback', feedbackObj)
                .then(function (result) {
                console.log('result', result.data);
                deferred.resolve(result.data);
            }, function (err) {
                console.log(err);
            });
            return deferred.promise;
        };
        svc.archiveFeedback = function (feedbackId) {
            var deferred = $q.defer();
            $http.put('/feedback/' + feedbackId)
                .then(function (result) {
                console.log(result.data);
                deferred.resolve(result.data);
            }, function (err) {
                console.log(err);
            });
            return deferred.promise;
        };
        svc.getFeedback = function () {
            var deferred = $q.defer();
            $http.get('/feedback')
                .then(function (result) {
                deferred.resolve(result.data);
            }, function (err) {
                console.log(err);
            });
            return deferred.promise;
        };
    }]);
app.controller('GalleryController', [function () {
        var vm = this;
        vm.test = 'test';
    }]);
/// <reference path="../../js/app.ts" />
app.controller('HomeController', ['LoginService', function (LoginService) {
        var vm = this;
        vm.testUser = function () {
            LoginService.getUser();
        };
    }]);
/// <reference path="../../js/app" />
app.controller('LoginController', ['LoginService', '$location', '$state', function (LoginService, $location, $state) {
        var vm = this;
        LoginService.getUser()
            .then(function (result) {
            if (result.username) {
                $state.go('user-dashboard');
            }
        });
        vm.login_local = function () {
            LoginService.login_local({
                username: vm.username,
                password: vm.password
            })
                .then(function (result) {
                if (!result.username) {
                    return console.log(result);
                }
                else if (result.isAdmin) {
                    $state.go('admin-dashboard');
                }
                else {
                    vm.currentUser = result;
                    $state.go('user-dashboard');
                }
            });
        };
        // vm.login_facebook = function() {
        // 	LoginService.login_facebook()
        // 		.then(function(result) {
        // 			vm.currentUser = result.data;
        // 		});
        // };
    }]);
//------------------------------------------- LOGIN SERVICE
/// <reference path="../../js/app" />
app.service('LoginService', ['$http', '$q', '$location', function ($http, $q, $location) {
        var serv = this;
        serv.currentUser = {};
        serv.login_local = function (loginData) {
            if (!loginData.username) {
                console.log('No login data submitted');
            }
            else {
                var deferred = $q.defer();
                $http.post('/auth/local', loginData)
                    .then(function (result) {
                    if (!result)
                        return deferred.resolve({ msg: 'Problem logging in' });
                    serv.currentUser = result.data;
                    deferred.resolve(result.data);
                });
                return deferred.promise;
            }
            return null;
        };
        // ----- METHODS FOR REGISTRATION THAT MAY EVENTUALLY AFFECT LOGIN
        serv.isUsernameTaken = function (username) {
            var deferred = $q.defer();
            $http.get('/username/' + username)
                .then(function (result) {
                console.log(result);
                deferred.resolve(result.data);
            });
            return deferred.promise;
        };
        serv.verify_reg_local = function (registerData) {
            var deferred = $q.defer();
            if (!registerData.username || !registerData.password || !registerData.confirmPassword) {
                deferred.reject({
                    msg: 'Form wasn\'t filled out or is incomplete.  Fill out the form first and then submit.'
                });
            }
            else if (registerData.password.length < 5) {
                deferred.reject({
                    msg: 'Password is too short.  Your password must be at least 5 characters long and contain at least one letter, one number, and one special character.'
                });
            }
            else if (!registerData.password.match(/[a-zA-Z_]/) ||
                !registerData.password.match(/\d/) ||
                !registerData.password.match(/\W/)) {
                deferred.reject({
                    msg: 'Invalid password.  Your password must be at least 5 characters long and contain at least one letter, one number, and one special character.'
                });
            }
            else if (registerData.password !== registerData.confirmPassword) {
                deferred.reject({
                    msg: 'Password and Confirm Password don\'t match.  Please try retyping them.'
                });
            }
            else {
                serv.isUsernameTaken(registerData.username)
                    .then(function (result) {
                    if (result)
                        deferred.reject({
                            msg: 'Username is already in use.  Pick a different name.',
                            data: result
                        });
                    else
                        deferred.resolve({
                            msg: 'Perfect!  Continuing on to step 2',
                            data: result
                        });
                });
            }
            return deferred.promise;
        };
        serv.createUser = function (userData) {
            var deferred = $q.defer();
            $http.post('/user', userData)
                .then(function (user) {
                if (!user)
                    return deferred.resolve({ msg: 'User create error', data: user });
                deferred.resolve(user.data);
            });
            return deferred.promise;
        };
        serv.getUser = function () {
            var deferred = $q.defer();
            $http.get('/user')
                .then(function (result) {
                deferred.resolve(result.data);
            }, function (err) {
                console.log('No user is currently logged in.');
                deferred.resolve({});
            });
            return deferred.promise;
        };
        serv.isAuthed = function () {
            var deferred = $q.defer();
            $http.get('/user')
                .then(function (result) {
                serv.currentUser = result.data;
                deferred.resolve(result.data);
            }, function (err) {
                $location.path('/');
            });
            return deferred.promise;
        };
        serv.logout = function () {
            $http.get('/logout')
                .then(function (result) {
                console.log('Goodbye!');
                serv.currentUser = {};
                $location.path('/');
            });
        };
        serv.editItem = function (changeObj) {
            var deferred = $q.defer();
            $http.post('/user/' + changeObj.id, changeObj)
                .then(function (result) {
                deferred.resolve(result.data);
            }, function (err) {
                console.log(err);
            });
            return deferred.promise;
        };
    }]);
app.controller('RegisterController', ['LoginService', '$state', function (LoginService, $state) {
        var vm = this;
        LoginService.getUser()
            .then(function (result) {
            if (result.username) {
                $state.go('user-dashboard');
            }
        });
        vm.reg_step = 1;
        vm.verify_local = function () {
            LoginService.verify_reg_local({
                username: vm.newUsername,
                password: vm.newPassword,
                confirmPassword: vm.confirmPassword
            }).then(function (result) {
                // notificationBubble(result.msg);
                if (result.data === false) {
                    vm.reg_step = 2;
                }
                else
                    console.error(result);
            }, function (err) {
                console.error(err);
            });
        };
        vm.takeFromOAuth = function () {
        };
        vm.verify_step2 = function () {
            if (!vm.newFirstName && !vm.newLastName && !vm.newEmail) {
                console.log('You need to fill in the form before you submit it.');
            }
            else if (((vm.newFirstName && vm.newLastName) || vm.OAuthData) && vm.newEmail) {
                vm.reg_step = 3;
            }
        };
        vm.verify_step3 = function () {
            // if ( (vm.securityQ1 && vm.securityA1) &&
            // 	 (vm.securityQ2 && vm.SecurityA2) &&
            // 	 (vm.securityQ3 && vm.securityA3) ) {
            LoginService.createUser({
                name: vm.newFirstName + ' ' + vm.newLastName,
                username: vm.newUsername,
                email: vm.newEmail,
                password: vm.newPassword,
                createdOn: new Date(),
                security: {
                    questions: [
                        { questionNum: 1, question: vm.securityQ1, answer: vm.securityA1 },
                        { questionNum: 2, question: vm.securityQ2, answer: vm.securityA2 },
                        { questionNum: 3, question: vm.securityQ3, answer: vm.securityA3 }
                    ]
                }
            })
                .then(function (result) {
                // console.log(result);
                vm.currentUser = result.data.data;
            });
            vm.reg_step = 4;
            // }
        };
    }]);
app.controller('UserDashboardController', ['LoginService', '$stateParams', function (LoginService, $stateParams) {
        var vm = this;
        vm.user = {};
        LoginService.isAuthed()
            .then(function (result) {
            vm.user = result;
        });
    }]);
