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

var UserController = require('./controllers/UserController');


var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated())
		return res.sendStatus(401);
	
	return next();
};


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: config.sessionSecret,
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/user', UserController.register);
app.get('/user', isAuthed, UserController.me);
app.put('/user', isAuthed, UserController.update);


app.post('/auth/local', passport.authenticate('local', {
	successRedirect: '/user'
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRedirect: '/login', 
}), function(req, res) {
	console.log(req.session);
});


app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter'))

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