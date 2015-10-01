var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	mongoURI = 'mongodb://localhost27017/debate',
	host = 'localhost',
	port = 8877;

var app = express();

var UserController = require('./Mongoose Controllers/UserController');


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));




app.listen(port, function() {
	console.log("Express app running at http://%s:%s", host, port);
})