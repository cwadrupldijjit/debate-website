app.directive('fileread', ['ImageService', function(ImageService) {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var tempArray = elem['context'].value.split('\\');
			var filename = tempArray[tempArray.length - 1];
			
			elem.bind('change', function(changeEvent) {
				var reader = new FileReader();
				
				reader.onload = function(loadEvent) {
					var fileread = loadEvent.target.result;
					
					ImageService.storeImage(fileread, filename)
				};
				
				reader.readAsDataURL(changeEvent.target.files[0]);
				
			});
			
		}
	};
}]);