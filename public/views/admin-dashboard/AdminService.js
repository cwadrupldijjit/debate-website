app.service('AdminService', ['LoginService', '$state', '$http', '$q', function(LoginService, $state, $http, $q) {
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
				console.log(result);
				deferred.resolve(result.data);
			});
		
		return deferred.promise;
	};
}]);