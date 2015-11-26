app.directive('fileread', ['ImageService', function(ImageService) {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			
			elem.bind('change', function(changeEvent) {
				var filename = filenameParser(elem.context.value);
				
				var reader = new FileReader();
				
				reader.onload = function(loadEvent) {
					var fileread = loadEvent.target.result;
					
					ImageService.storeGalleryImage(fileread, filename)
				};
				
				reader.readAsDataURL(changeEvent.target.files[0]);
				
			});
			
			function filenameParser(filePath) {
				var backwardsName = reverseString(filePath);
				var splitSpot = filePath.lastIndexOf('\\');
				var wholeFileName = filePath.slice(splitSpot + 1);
				
				return reverseString(reverseString(wholeFileName).slice(reverseString(wholeFileName).indexOf('.') + 1));
				
				// return (reverseString(backwardsName.))
			}
			
			function reverseString(str) {
				var newStr = '';
				for (var i = str.length - 1; i >= 0; i--) {
					newStr += str[i];
				}
				return newStr;
			}
		}
	};
}]);