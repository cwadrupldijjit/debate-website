app.directive('fileread', function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			elem.bind('change', function(changeEvent) {
				var reader = new FileReader();
				
				reader.onload = function(loadEvent) {
					var fileread = loadEvent.target.result;
					console.log(fileread);
				};
				
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}
	};
});