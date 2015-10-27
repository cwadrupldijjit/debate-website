var express = require('express'),
	session = require('express-session'),
	passport = require('./services/passport'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	config = require('./config'),
	mongoURI = config.mongoURI,
	host = 'localhost',
	port = config.port;

var app = express();

app.use(session({
	secret: config.sessionSecret,
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

var UserController = require('./controllers/UserController');
var FeedbackController = require('./controllers/FeedbackController')


var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated())
		return res.status(401)
				  .send('No user is currently logged in.');
	
	return next();
};

var isAdmin = function(req, res, next) {
	if (!req.user.isAdmin) {
		return res.status(403)
				  .send('You currently do not have permissions to access this data');
	}
	
	return next();
}


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.post('/user/:id', isAuthed, UserController.updateAccount);
app.post('/user', UserController.register);
app.get('/user', isAuthed, UserController.me);
app.put('/user', isAuthed, UserController.update);

app.get('/users', isAuthed, UserController.all);

app.get('/new-users', isAdmin, UserController.allNew);
app.put('/new-users/:id', isAdmin, UserController.acceptUser);
app.delete('/new-users/:id', isAdmin, UserController.declineUser);

app.get('/username/:username', UserController.checkUsername);

app.post('/feedback', isAuthed, FeedbackController.addNew);
app.get('/feedback', isAdmin, FeedbackController.read);
app.put('/feedback/:id', isAdmin, FeedbackController.removeOne);


app.post('/auth/local', passport.authenticate('local', {
	successRedirect: '/user'
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRedirect: '/login'
}), function(req, res) {
	console.log(req.session);
});


app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	successRedirect: '/me',
	failureRedirect: '/login'
}), function(req, res) {
	console.log(req.session);
});

// app.get('/auth/google', passport.authenticate('google'));
// app.get('/auth/google/callback', passport.authenticate('google', {
// 	successRedirect: '/me',
// 	failureRedirect: '/login'
// }), function(req, res) {
// 	console.log(req.session);
// });

app.get('/logout', function(req, res) {
	req.logout();
	return res.send('logged out');
})


mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
	console.log('Connected to MongoDB at %s', mongoURI);
});


app.listen(port, function() {
	console.log("Express app running at http://%s:%s", host, port);
});