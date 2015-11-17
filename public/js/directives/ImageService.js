app.service('ImageService', ['$http', '$q', 'LoginService', function($http, $q, LoginService) {
	var svc = this;
	
	svc.storeImage = function(imageData, fileName) {
		var deferred = $q.defer();
		
		var imageExtension = imageData.split(';')[0].split('/');
		imageExtension = imageExtension[imageExtension.length - 1];
		
		var newImage = {
			imageName: fileName,
			imageBody: imageData,
			imageExtension: imageExtension,
			userEmail: LoginService.currentUser
		};
		
		$http.post('/api/new-image', newImage)
			.then(function(result) {
				deferred.resolve(result.data);
			});
		
		return deferred.promise;
	};
}]);