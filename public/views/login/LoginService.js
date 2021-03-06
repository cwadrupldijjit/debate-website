/* global app */
app.service('LoginService', ['$http', '$q', '$location', function($http, $q, $location) {
	var serv = this;
	serv.currentUser = {};
	
	serv.login_local = function(loginData) {
		if (!loginData.username) {
			console.log('No login data submitted');
		} else {
			var deferred = $q.defer();
			
			$http.post('/auth/local', loginData)
				.then(function(result) {
					if (!result)
						return deferred.resolve({msg: 'Problem logging in'});
					
					serv.currentUser = result.data;
					deferred.resolve(result.data);
				});
			
			return deferred.promise;
		}
		
		return null;
	};
	
	
	// ----- METHODS FOR REGISTRATION THAT MAY EVENTUALLY AFFECT LOGIN
	
	serv.isUsernameTaken = function(username) {
		var deferred = $q.defer();
		
		$http.get('/username/' + username)
			.then(function(result) {
				console.log(result);
				deferred.resolve(result.data);
			});
			
		return deferred.promise;
	};
	
	serv.verify_reg_local = function(registerData) {
		var deferred = $q.defer();
		
		if (!registerData.username || !registerData.password || !registerData.confirmPassword) {
			deferred.reject({
				msg: 'Form wasn\'t filled out or is incomplete.  Fill out the form first and then submit.'
			});
		} else if (registerData.password.length < 5) {
			deferred.reject({
				msg: 'Password is too short.  Your password must be at least 5 characters long and contain at least one letter, one number, and one special character.'
			});
		} else if (!registerData.password.match(/[a-zA-Z_]/) ||
				   !registerData.password.match(/\d/) ||
				   !registerData.password.match(/\W/)) {
			deferred.reject({
				msg: 'Invalid password.  Your password must be at least 5 characters long and contain at least one letter, one number, and one special character.'
			});
		} else if (registerData.password !== registerData.confirmPassword) {
			deferred.reject({
				msg: 'Password and Confirm Password don\'t match.  Please try retyping them.'
			});
		} else {
			serv.isUsernameTaken(registerData.username)
				.then(function(result) {
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
	
	serv.createUser = function(userData) {
		var deferred = $q.defer();
		
		$http.post('/user', userData)
			.then(function(user) {
				if (!user) 
					return deferred.resolve({msg: 'User create error', data: user})
				deferred.resolve(user.data)
			});
		
		return deferred.promise;
	};
	
	serv.getUser = function() {
		var deferred = $q.defer();
		
		$http.get('/user')
			.then(function(result) {
				deferred.resolve(result.data);
			}, function(err) {
				console.log('No user is currently logged in.');
				
				deferred.resolve({});
			});
		
		return deferred.promise;
	};
	
	serv.isAuthed = function() {
		var deferred = $q.defer();
		
		$http.get('/user')
			.then(function(result) {
				serv.currentUser = result.data
				deferred.resolve(result.data);
			}, function(err) {
				$location.path('/');
			});
		
		return deferred.promise;
	};
	
	
	
	serv.logout = function() {
		$http.get('/logout')
			.then (function(result) {
				console.log('Goodbye!');
				serv.currentUser = {};
				$location.path('/');
			});
	};
	
	
	
	serv.editItem = function(changeObj) {
		var deferred = $q.defer();
		
		$http.post('/user/' + changeObj.id, changeObj)
			.then(function(result) {
				deferred.resolve(result.data);
			}, function(err) {
				console.log(err);
			});
		
		return deferred.promise;
	};
}]);