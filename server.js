var express = require('express'),
	session = require('express-session'),
	passport = require('./services/passport'),
	localAuth = require('passport-local'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	config = require('./config'),
	mongoURI = config.mongoURI,
	host = 'localhost',
	port = config.port;

var app = express();

var UserController = require('./controllers/UserController');


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

app.post('/login', passport.authenticate('local', {
	successRedirect: '/user'
}));
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