var express = require('express'),
	session = require('express-session'),
	passport = require('passport'),
	localAuth = require('passport-local'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	config = require('./config'),
	mongoURI = config.mongoURI,
	host = 'localhost',
	port = config.mongoURI;

var app = express();

var UserController = require('./controller/UserController');


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: config.sessionSecret,
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/user', UserController)


app.listen(port, function() {
	console.log("Express app running at http://%s:%s", host, port);
});