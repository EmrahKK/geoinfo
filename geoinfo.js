var mongoose = require('./config/mongoose'),
	express = require('./config/express');

var db = mongoose();
var app = express();

var port = 3017;
app.listen(port);

module.exports = app;