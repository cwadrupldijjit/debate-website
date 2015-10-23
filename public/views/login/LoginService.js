app.service('LoginService', ['$http', '$q', '$location', function($http, $q, $location) {
	var serv = this;
	
	serv.login_local = function(loginData) {
		if (!loginData.username) {
			console.log('No login data submitted');
		} else {
			var deferred = $q.defer();
			
			$http.post('/auth/local', loginData)
				.then(function(result) {
					if (!result)
						deferred.resolve({msg: 'Problem logging in'});
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
				deferred.resolve(result);
			});
			
		return deferred.promise;
	};
	
	serv.verify_reg_local = function(registerData) {
		var deferred = $q.defer();
		
		if (!registerData.username || !registerData.password || !registerData.confirmPassword) {
			deferred.resolve({msg: 'Form wasn\'t filled out or is incomplete.  Fill out the form first and then submit.'});
		} else if (registerData.password !== registerData.confirmPassword) {
			deferred.resolve({msg: 'Password and Confirm Password don\'t match.  Please try retyping them.'});
		} else {
			serv.isUsernameTaken(registerData.username)
				.then(function(result) {
					if (result.data)
						deferred.resolve({msg: 'Username is already in use.  Pick a different name.', data: result.data});
					else
						deferred.resolve({msg: 'Perfect!  Continuing on to step 2', data: result});
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
				console.log(user);
				deferred.resolve(user)
			});
		
		return deferred.promise;
	};
	
	serv.getUser = function() {
		$http.get('/user')
			.then(function(result) {
				console.log(result.data);
			}, function(err) {
				console.log('No user is currently logged in.');
			});
	};
	
	serv.isAuthed = function() {
		var deferred = $q.defer();
		
		$http.get('/user')
			.then(function(result) {
				deferred.resolve(result.data);
			}, function(err) {
				$location.path('/')
			});
	};
	
	
	
	serv.logout = function() {
		$http.get('/logout')
			.then (function(result) {
				console.log('Goodbye!');
				$location.path('/')
			})
	};
}]);