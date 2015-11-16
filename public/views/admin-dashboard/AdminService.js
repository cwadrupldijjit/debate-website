/* global app */
app.service('AdminService', ['LoginService', '$state', '$interval', '$http', '$q', function(LoginService, $state, $interval, $http, $q) {
	var svc = this;
	
	LoginService.getUser()
		.then(function(result) {
			if (!result.isAdmin) {
				$state.go('home');
			}
			svc.currentUser = result;
		})
	
	svc.getNewUsers = function() {
		var deferred = $q.defer();
		
		$http.get('/new-users')
			.then(function(result) {
				svc.newUsers = result.data;
				deferred.resolve(result.data);
			});
		
		return deferred.promise;
	};
	
	svc.acceptNewUser = function(user) {
		var deferred = $q.defer();
		
		$http.put('/new-users/' + user._id)
			.then(function(result) {
				deferred.resolve(result.data);
			});
		
		return deferred.promise;
	};
	
	svc.declineNewUser = function(user) {
		var deferred = $q.defer();
		
		$http.delete('/new-users/' + user._id)
			.then(function(result) {
				deferred.resolve(result);
			}, function(err) {
				console.log(err);
			});
		
		return deferred.promise;
	}
}]);