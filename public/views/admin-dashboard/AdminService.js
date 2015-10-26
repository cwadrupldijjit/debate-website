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
				$interval(svc.getNewUsers, 30000);
			});
		
		return deferred.promise;
	};
}]);