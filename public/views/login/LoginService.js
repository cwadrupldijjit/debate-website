app.service('LoginService', [function() {
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
		if (!loginData) {
			console.log('No login data submitted');
			return null;
		}
		
		if (loginData) {
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
			
			return null;
		}
	};
}]);