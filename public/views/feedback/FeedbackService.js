app.service('FeedbackService', ['LoginService', 'AdminService', '$state', '$http', '$q', function(LoginService, AdminService, $state, $http, $q) {
	var svc = this;
	
	svc.submitFeedback = function(feedbackObj) {
		var deferred = $q.defer();
		
		$http.post('/feedback', feedbackObj)
			.then(function(result) {
				console.log('result', result.data);
				deferred.resolve(result.data);
			}, function(err) {
				console.log(err);
			});
		
		return deferred.promise;
	};
	
	svc.archiveFeedback = function(feedbackId) {
		var deferred = $q.defer();
		
		$http.put('/feedback/' + feedbackId)
			.then(function(result) {
				console.log(result.data);
				deferred.resolve(result.data);
			}, function(err) {
				console.log(err);
			});
		
		return deferred.promise;
	};
	
	svc.getFeedback = function() {
		var deferred = $q.defer();
		
		$http.get('/feedback')
			.then(function(result) {
				deferred.resolve(result.data);
			}, function(err) {
				console.log(err);
			});
		
		return deferred.promise;
	};
}]);