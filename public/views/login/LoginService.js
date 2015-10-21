app.service('LoginService', ['$http', '$q', function($http, $q) {
	var serv = this;
	
	serv.users = [
		{
			username: 'test',
			password: 'test',
			id: '1234567',
			avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UserAvatar.svg/2000px-UserAvatar.svg.png'
		}
	];
	
	serv.login_local = function(loginData) {
		if (!loginData.username) {
			console.log('No login data submitted');
		} else {
			for (var i = 0; i < serv.users.length; i++) {
				if (serv.users[i].username === loginData.username) {
					if (serv.users[i].username === loginData.password) {
						console.log('user authenticated successfully');
						return serv.users[i];
					}
					console.log('Password doesn\'t match');
					return null;
				}
			}
			
			console.log('no user data is found for the username provided');
		}
		
		return null;
	};
	
	serv.isUsernameTaken = function(username) {
		var deferred = $q.defer();
		
		$http.get('/username/' + username)
			.then(function(result) {
				console.log(result);
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
					if (result)
						deferred.resolve({msg: 'Username is already in use.  Pick a different name.', data: result.data});
					else
						deferred.resolve({msg: 'Perfect!  Continuing on to step 2', data: result});
				});
		}
		
		return deferred.promise;
	};
}]);