/// <reference path="../app" />

app.service('ImageService', ['$http', '$q', 'LoginService', function($http, $q, LoginService) {
	var svc = this;
	
	svc.storeImage = function(imageData, fileName) {
		var deferred = $q.defer();
		
		var imageExtension = imageData.split(';')[0].split('/');
		imageExtension = imageExtension[imageExtension.length - 1];
		
		LoginService.getUser()
			.then(function(user) {
				var newImage = {
					imageName: fileName,
					imageBody: imageData,
					imageExtension: imageExtension,
					username: user.username
				};
				
				console.log(newImage);
				
				$http.post('/add-gallery-image', newImage)
					.then(function(result) {
						deferred.resolve(result.data);
					});
			})
			
		return deferred.promise;
	};
}]);